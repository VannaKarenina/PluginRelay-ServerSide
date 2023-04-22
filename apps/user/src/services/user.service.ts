import {Redis} from "ioredis";
import {
  IAccountNewPassword,
  IAccountPasswordRecovery,
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

  private em: EntityManager;
  private redisInstance: Redis;
  private emailServiceClient: MailerServiceClient;

  constructor(broker) {
    this.em = orm.em.fork() as EntityManager;
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

  async accountCreationVerification(ctx: IAccountVerification) {

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
  }

  async accountPasswordRecovery(loginOrEmail: string) {

    const account = await this.em
      .createQueryBuilder(AccountEntity)
      .where({
        [expr('lower(login)')]: loginOrEmail.toLowerCase(),
      })
      .orWhere({ [expr('lower(email)')]: loginOrEmail.toLowerCase() })
      .getSingleResult();

    if (!account) throw new MoleculerClientError('Account with this login/email not found', 400);

    if (account.status == AccountStatus.Active || account.status == AccountStatus.Suspended)
      throw new MoleculerClientError('This account currently suspended or not verify email', 400);

    account.status = AccountStatus.RecoveryInit;

    const code = verificationCodeGenerator(100000, 999999);

    this.redisInstance.set(account.email, code);

    await this.emailServiceClient.sendRecoveryCode({email: account.email, code});

    return true;

  }

  async accountConfirmRecovery(ctx: IAccountPasswordRecovery) {

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

    await this.redisInstance.del(account.email, code.toString());

    await this.em.flush();

    return true;

  }

  async accountPasswordChange(ctx: IAccountNewPassword) {

    const {loginOrEmail, password} = ctx;

    const account = await this.em
      .createQueryBuilder(AccountEntity)
      .where({
        [expr('lower(login)')]: loginOrEmail.toLowerCase(),
      })
      .orWhere({ [expr('lower(email)')]: loginOrEmail.toLowerCase() })
      .getSingleResult();

    account.password = bcrypt.hashSync(password, 10);

    await this.em.flush();

    return true;

  }

}
