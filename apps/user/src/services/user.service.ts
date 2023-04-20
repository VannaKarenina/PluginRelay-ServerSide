import {Redis} from "ioredis";
import {INewAccount, IOrmAccount} from "@mmh/common/shared/interfaces";
import { redisUrl } from "@mmh/common/utils/redis";
import { EntityManager } from "@mikro-orm/postgresql";
import {orm} from "../database/mikro-orm";
import {AccountEntity} from '@mmh/entities'
import {expr} from "@mikro-orm/core";
import * as Moleculer from "moleculer";
import MoleculerClientError = Moleculer.Errors.MoleculerClientError;
import {AccountStatus} from "@mmh/common";

export default class UserService {

  private em: EntityManager;
  private redisInstance: Redis;

  constructor() {
    this.em = orm.em.fork() as EntityManager;
    this.redisInstance = new Redis(redisUrl)
  }

  async createUser(ctx: INewAccount) {

    const {login, email, password} = ctx;

    const account = await this.em
      .createQueryBuilder(AccountEntity)
      .where({
        [expr('lower(login)')]: login.toLowerCase(),
      })
      .orWhere({ [expr('lower(email)')]: email.toLowerCase() })
      .getSingleResult();

    if (account) throw new MoleculerClientError('Account with this login/email is exist');

    const newAccount = new AccountEntity();
    newAccount.login = login;
    newAccount.email = email;
    newAccount.password = password;
    newAccount.status = AccountStatus.Pending; //TODO: WARNING DB TYPE IS SET TO STRING

    await this.em.persistAndFlush(newAccount);

  }

  async changePassword() {

  }

  async changeUserStatus() {

  }

  async getUserByCredentials() {

  }

}
