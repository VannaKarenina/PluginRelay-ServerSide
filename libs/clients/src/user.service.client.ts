import BaseServiceClient from "@mmh/clients/base/base.service.client";
import {USER_SERVICE_NAME} from "@mmh/user/constants";
import {
  IAccountChangeAvatar, IAccountLoginByCredentials,
  IAccountNewPassword,
  IAccountPasswordRecovery,
  IAccountVerification,
  INewAccount
} from "@mmh/common";

export class UserServiceClient extends BaseServiceClient {

  serviceName = USER_SERVICE_NAME

  constructor(broker) {
    super(broker);
  }

  async createAccount(ctx: INewAccount) {
    return this.call('createAccount', ctx);
  }

  async accountCreationVerification(ctx: IAccountVerification) {
    return this.call('accountCreationVerification', ctx);
  }

  async accountPasswordRecovery(loginOrEmail: string) {
    return this.call('accountPasswordRecovery', {loginOrEmail: loginOrEmail});
  }

  async accountRecoveryConfirm(ctx: IAccountPasswordRecovery) {
    return this.call('accountRecoveryConfirm', ctx);
  }

  async accountPasswordChange(ctx: IAccountNewPassword) {
    return this.call('accountPasswordChange', ctx);
  }

  async accountChangeAvatar(ctx: IAccountChangeAvatar) {
    return this.call('accountChangeAvatar', ctx);
  }

  async accountLoginByLOR(ctx: IAccountLoginByCredentials) {
    return this.call('accountLoginByLOR', ctx);
  }

}
