import BaseServiceClient from "@mmh/clients/base/base.service.client";
import {MAILER_SERVICE_NAME} from "@mmh/mailer/constants";

export class MailerServiceClient extends BaseServiceClient {

  serviceName = MAILER_SERVICE_NAME;

  constructor(broker) {
    super(broker);
  }

  uploadFile(ctx: {
    key: string,
    file: object
  }) {
    return this.call('uploadFile', ctx)
  }

  sendVerificationCode(ctx: {
    email: string,
    login: string,
    code: number
  }) {
    return this.call('sendEmailConfirmCode', ctx);
  }

}
