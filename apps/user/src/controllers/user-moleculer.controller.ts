import {Service, Context, ServiceBroker} from 'moleculer';

import {Action} from 'moleculer-decorators';

import UserService from "../services/user.service";
import {USER_SERVICE_NAME} from "../constants";
import {Redis} from "ioredis";
import {
  IAccountChangeAvatar, IAccountLoginByCredentials,
  IAccountNewPassword,
  IAccountPasswordRecovery,
  IAccountVerification,
  INewAccount
} from "@mmh/common";

export default class UserMoleculerController extends Service {

  protected userService: UserService;

  constructor(public broker: ServiceBroker) {
    super(broker);
    this.userService = new UserService(broker);
    this.parseServiceSchema({
      name: USER_SERVICE_NAME,
      actions: this.actions
    })
  }

  @Action({
    params: {
      login: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      password: 'string'
    }
  })
  async createAccount(ctx: INewAccount) {
    return this.userService.createAccount(ctx);
  }

  @Action({
    params: {
      email: {
        type: 'string'
      },
      code: {
        type: 'number'
      }
    }
  })
  async accountCreationVerification(ctx: IAccountVerification) {
    return this.userService.accountCreationVerification(ctx);
  }

  @Action({
    loginOrEmail: {
      type: 'string'
    }
  })
  async accountPasswordRecovery(loginOrEmail: string) {
    return this.userService.accountPasswordRecovery(loginOrEmail);
  }

  @Action({
    loginOrEmail: {
      type: 'string'
    },
    code: {
      type: 'number'
    }
  })
  async accountRecoveryConfirm(ctx: IAccountPasswordRecovery) {
    return this.userService.accountConfirmRecovery(ctx);
  }

  @Action({
    loginOrEmail: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  })
  async accountPasswordChange(ctx: IAccountNewPassword) {
    return this.userService.accountPasswordChange(ctx);
  }

  @Action({
    accountId: {
      type: 'number'
    },
    avatarUrl: {
      type: 'string'
    }
  })
  async accountChangeAvatar(ctx: IAccountChangeAvatar) {
    return this.userService.accountChangeAvatar(ctx);
  }

  @Action({
    loginOrEmail: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  })
  async accountLoginByLOR(ctx: IAccountLoginByCredentials) {
    return this.userService.accountLoginByCredentials(ctx);
  }


}
