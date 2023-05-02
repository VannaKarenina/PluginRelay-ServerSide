import {Service, Context, ServiceBroker} from 'moleculer';

import {Action} from 'moleculer-decorators';

import UserService from "../services/user.service";
import {USER_SERVICE_NAME} from "../constants";
import {
  IAccountChangeAvatar,
  IAccountLoginByCredentials,
  IAccountPasswordChange,
  IAccountRecoveryConfirm,
  IAccountRecoveryInit,
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
  async createAccount(ctx: Context<INewAccount>) {
    return this.userService.createAccount(ctx.params);
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
  async accountVerification(ctx: Context<IAccountVerification>) {
    return this.userService.accountVerification(ctx.params);
  }

  @Action({
    loginOrEmail: {
      type: 'string'
    }
  })
  async accountRecoveryInit(ctx: Context<IAccountRecoveryInit>) {
    return this.userService.accountRecoveryInit(ctx.params);
  }

  @Action({
    loginOrEmail: {
      type: 'string'
    },
    code: {
      type: 'number'
    }
  })
  async accountRecoveryConfirm(ctx: Context<IAccountRecoveryConfirm>) {
    return this.userService.accountRecoveryConfirm(ctx.params);
  }

  @Action({
    loginOrEmail: {
      type: 'string'
    },
    signature: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  })
  async accountPasswordChange(ctx: Context<IAccountPasswordChange>) {
    return this.userService.accountPasswordChange(ctx.params);
  }

  @Action({
    accountId: {
      type: 'number'
    },
    avatarUrl: {
      type: 'string'
    }
  })
  async accountChangeAvatar(ctx: Context<IAccountChangeAvatar>) {
    return this.userService.accountChangeAvatar(ctx.params);
  }

  @Action({
    loginOrEmail: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  })
  async accountLoginByLOR(ctx: Context<IAccountLoginByCredentials>) {
    return this.userService.accountLoginByCredentials(ctx.params);
  }


}
