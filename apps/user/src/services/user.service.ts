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

    if (account) throw new MoleculerClientError('Account with this login/email is exist', 400);

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

    const account = await this.em.getRepository(AccountEntity).findOne({
      email: ctx.email
    })

    if (!account) throw new MoleculerServerError('Account with waiting verification status not found', 400);

    if (parseInt(await this.redisInstance.get(ctx.email)) != ctx.code) {
      throw new MoleculerServerError('Invalid verification code', 400);
    }

    await this.redisInstance.del(ctx.email, ctx.code.toString());

    account.status = AccountStatus.Active;

    await this.em.flush();

    return true;
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

    if (!account) throw new MoleculerClientError('Account with this login/email not found', 400);

    if (account.status == AccountStatus.Pending || account.status == AccountStatus.Suspended)
      throw new MoleculerClientError('This account currently suspended or not verified email', 400);

    account.status = AccountStatus.RecoveryInit;

    const code = verificationCodeGenerator(100000, 999999);

    this.redisInstance.set(account.email, code);

    try {
      await this.emailServiceClient.sendRecoveryCode({email: account.email, code: code});
    } catch (Error: any) {
      if (Error) throw new MoleculerServerError(`Something went wrong while sending verification message: \n ${Error}`, 400);
    }

    return true;

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

    if (parseInt(await this.redisInstance.get(account.email)) != code)
      throw new MoleculerClientError('Incorrect recovery code');

    account.status = AccountStatus.RecoveryConfirmed;

    const signature = verificationCodeGenerator(100000, 999999999999);

    await this.redisInstance.del(account.email, code.toString());

    await this.redisInstance.set(account.email, signature.toString());

    await this.em.flush();

    return {
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

    if (await this.redisInstance.get(account.email) != signature.toString())
      throw new MoleculerClientError("Signature error. Report this to support", 400);

    if (account.status != AccountStatus.RecoveryConfirmed)
      throw new MoleculerClientError("Account recovery not confirmed", 400)

    account.password = bcrypt.hashSync(password, 10);
    account.status = AccountStatus.Active;

    await this.em.flush();

    return true;

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

    if (account.status)

    return password ? bcrypt.compareSync(password, account.password) ? account : null : account;
  }

  async getAccountById(ctx: IAccountIDInterface) {

    const {id} = ctx;

    const account = await this.em.getRepository(AccountEntity).findOne({id: id}, {populate: ['projects']});

    if (!account) throw new MoleculerServerError(`No account with this id [${id}]`, 400);

    return account;

  }

}
