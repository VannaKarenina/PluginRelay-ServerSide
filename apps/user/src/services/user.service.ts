import {Redis} from "ioredis";
import {
  IAccountChangeAvatar, IAccountIDInterface,
  IAccountLoginWithCredentials,
  IAccountPasswordChange,
  IAccountRecoveryConfirm,
  IAccountRecoveryInit,
  IAccountVerification,
  INewAccount
} from "@mmh/common/shared/interfaces";
import { redisUrl } from "@mmh/common/utils/redis";
import { EntityManager } from "@mikro-orm/postgresql";
import {orm} from "../database/mikro-orm";
import {AccountEntity} from '@mmh/entities'
import {expr} from "@mikro-orm/core";
import * as Moleculer from "moleculer";
import MoleculerClientError = Moleculer.Errors.MoleculerClientError;
import {AccountStatus} from "@mmh/common";
import * as bcrypt from 'bcrypt'
import {MailerServiceClient} from "@mmh/clients";
import {verificationCodeGenerator} from "@mmh/common/utils/generators";
import MoleculerServerError = Moleculer.Errors.MoleculerServerError;

export default class UserService {

  private initEm: EntityManager;
  private em;
  private redisInstance: Redis;
  private emailServiceClient: MailerServiceClient;

  constructor(broker) {
    this.initEm = orm.em as EntityManager;
    this.em = this.initEm.fork();
    this.emailServiceClient = new MailerServiceClient(broker);
    this.redisInstance = new Redis(redisUrl)
  }

  async createAccount(ctx: INewAccount) {

    const {login, email, password} = ctx;

    const account = await this.em
      .createQueryBuilder(AccountEntity)
      .where({
        [expr('lower(login)')]: login.toLowerCase(),
      })
      .orWhere({ [expr('lower(email)')]: email.toLowerCase() })
      .getSingleResult();

    if (account) {
      return {
        code: 405,
        message: 'Account with this login or email already exist!'
      }
    }

    const newAccount = new AccountEntity();
    newAccount.login = login;
    newAccount.email = email;
    newAccount.password = bcrypt.hashSync(password, 10);
    newAccount.status = AccountStatus.Pending;

    await this.em.persistAndFlush(newAccount);

    const code = verificationCodeGenerator(100000, 999999);

    this.redisInstance.set(email, code);

    await this.emailServiceClient.sendVerificationCode({email, code})

    return true;

  }

  async accountVerification(ctx: IAccountVerification) {

    const account = await this.em
      .createQueryBuilder(AccountEntity)
      .where({
        [expr('lower(login)')]: ctx.email.toLowerCase(),
      })
      .orWhere({ [expr('lower(email)')]: ctx.email.toLowerCase() })
      .getSingleResult();

    if (!account) throw new MoleculerServerError('Account with waiting verification status not found', 400);

    if (parseInt(await this.redisInstance.get(ctx.email)) != ctx.code) {
      return {
        code: 405,
        message: 'Invalid verification code'
      }
    }

    await this.redisInstance.del(ctx.email, ctx.code.toString());

    account.status = AccountStatus.Active;

    await this.em.flush();

    return {
      code: 200,
      message: 'Confirmed'
    };
  }

  async accountRecoveryInit(ctx: IAccountRecoveryInit) {

    const {loginOrEmail} = ctx;

    const account = await this.em
      .createQueryBuilder(AccountEntity)
      .where({
        [expr('lower(login)')]: loginOrEmail.toLowerCase(),
      })
      .orWhere({ [expr('lower(email)')]: loginOrEmail.toLowerCase() })
      .getSingleResult();

    if (!account) {
      return {
        code: 805,
        message: 'Account with this login or email not found !'
      }
    }

    if (account.status == AccountStatus.Pending || account.status == AccountStatus.Suspended) {
      return {
        code: 805,
        message: 'Account currently suspended or not verified !'
      }
    }


    account.status = AccountStatus.RecoveryInit;

    const code = verificationCodeGenerator(100000, 999999);

    this.redisInstance.set(account.email, code);

    try {
      await this.emailServiceClient.sendRecoveryCode({email: account.email, code: code});
    } catch (Error: any) {
      if (Error) {
        return {
          code: 805,
          message: "Internal service error. CODE: MAILER"
        }
      }
    }

    return {
      code: 802,
      message: 'Verification message sent !'
    };

  }

  async accountRecoveryConfirm(ctx: IAccountRecoveryConfirm) {

    const {loginOrEmail, code} = ctx;

    const account = await this.em
      .createQueryBuilder(AccountEntity)
      .where({
        [expr('lower(login)')]: loginOrEmail.toLowerCase(),
      })
      .orWhere({ [expr('lower(email)')]: loginOrEmail.toLowerCase() })
      .getSingleResult();

    if (parseInt(await this.redisInstance.get(account.email)) != code) {
      return {
        code: 805,
        message: 'Incorrect recovery code !'
      }
    }

    account.status = AccountStatus.RecoveryConfirmed;

    const signature = verificationCodeGenerator(100000, 999999999999);

    await this.redisInstance.del(account.email, code.toString());

    await this.redisInstance.set(account.email, signature.toString());

    await this.em.flush();

    return {
      code: 802,
      signature: signature
    };

  }

  async accountPasswordChange(ctx: IAccountPasswordChange) {

    const {signature, password, loginOrEmail} = ctx;

    const account = await this.em
      .createQueryBuilder(AccountEntity)
      .where({
        [expr('lower(login)')]: loginOrEmail.toLowerCase(),
      })
      .orWhere({ [expr('lower(email)')]: loginOrEmail.toLowerCase() })
      .getSingleResult();

    if (await this.redisInstance.get(account.email) != signature.toString()) {
      return {
        code: 805,
        message: 'Incorrect signatire data. Report this to operatorша '
      }
    }

    if (account.status != AccountStatus.RecoveryConfirmed)
      throw new MoleculerClientError("Account recovery not confirmed", 400)

    account.password = bcrypt.hashSync(password, 10);
    account.status = AccountStatus.Active;

    await this.em.flush();

    return {
      code: 802
    };

  }

  async accountChangeAvatar(ctx: IAccountChangeAvatar) {

    const {accountId, avatarUrl} = ctx;

    const account = await this.em.getRepository(AccountEntity).findOne({
      id: accountId
    })

    account.avatar = avatarUrl;

    await this.em.flush();

    return true;

  }

  async accountLoginByCredentials(ctx: IAccountLoginWithCredentials) {

    const {loginOrEmail, password} = ctx;

    const account = await this.em
      .createQueryBuilder(AccountEntity, 'account')
      .leftJoinAndSelect('account.projects', 'projects')
      .where({
        [expr('lower(login)')]: loginOrEmail.toLowerCase(),
      })
      .orWhere({ [expr('lower(email)')]: loginOrEmail.toLowerCase() })
      .getSingleResult();

    if (account == null) {
      return {
        code: 808,
        message: 'Account with this login or email not found !'
      }
    } else {
      if (account.status == AccountStatus.Active) {
        return password ? bcrypt.compareSync(password, account.password) ? account : null : account;
      } else {
        return {
          code: 800
        }
      }
    }
  }

  async getAccountById(ctx: IAccountIDInterface) {

    const {id} = ctx;

    const account = await this.em.getRepository(AccountEntity).findOne({id: id}, {populate: ['projects']});

    if (!account) throw new MoleculerServerError(`No account with this id [${id}]`, 400);
    delete account['password'];
    return account;

  }

}
