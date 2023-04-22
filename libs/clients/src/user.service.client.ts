import BaseServiceClient from "@mmh/clients/base/base.service.client";
import {USER_SERVICE_NAME} from "@mmh/user/constants";
import {INewAccount} from "@mmh/common";

export class UserServiceClient extends BaseServiceClient {

  serviceName = USER_SERVICE_NAME

  constructor(broker) {
    super(broker);
  }

  async createAccount(ctx: INewAccount) {
    return this.call('createAccount', ctx);
  }

}
