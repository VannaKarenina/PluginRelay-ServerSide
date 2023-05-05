import BaseServiceClient from "@mmh/clients/base/base.service.client";
import {USER_SERVICE_NAME} from "@mmh/user/constants";
import {
  IAccountChangeAvatar, IAccountIDInterface,
  IAccountLoginWithCredentials,
  IAccountPasswordChange,
  IAccountRecoveryConfirm,
  IAccountRecoveryInit,
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

  async accountVerification(ctx: IAccountVerification) {
    return this.call('accountVerification', ctx);
  }

  async accountRecoveryInit(ctx: IAccountRecoveryInit) {
    return this.call('accountRecoveryInit', ctx);
  }

  async accountRecoveryConfirm(ctx: IAccountRecoveryConfirm) {
    return this.call('accountRecoveryConfirm', ctx);
  }

  async accountPasswordChange(ctx: IAccountPasswordChange) {
    return this.call('accountPasswordChange', ctx);
  }

  async accountUpdateAvatar(ctx: IAccountChangeAvatar) {
    return this.call('accountChangeAvatar', ctx);
  }

  async accountLoginWithCredentials(ctx: IAccountLoginWithCredentials) {
    return this.call('accountLoginWithCredentials', ctx);
  }

  async getAccountById(ctx: IAccountIDInterface) {
    return this.call('getAccountById', ctx);
  }

}
