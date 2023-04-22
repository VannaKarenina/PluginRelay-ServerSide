import BaseServiceClient from "@mmh/clients/base/base.service.client";
import {MAILER_SERVICE_NAME} from "@mmh/mailer/constants";

export class MailerServiceClient extends BaseServiceClient {

  serviceName = MAILER_SERVICE_NAME;

  constructor(broker) {
    super(broker);
  }

  sendVerificationCode(ctx: {
    email: string,
    code: number
  }) {
    return this.call('sendEmailConfirmCode', ctx);
  }

  sendRecoveryCode(ctx:{
    email: string,
    code: number
  }) {
    return this.call('sendEmailRecoveryCode', ctx);
  }

}
