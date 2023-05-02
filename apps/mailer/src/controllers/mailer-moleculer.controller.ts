import {Service, Context, ServiceBroker} from 'moleculer';

import {Action} from 'moleculer-decorators';

import MailerService from "../services/mailer.service";
import {MAILER_SERVICE_NAME} from "../constants";
import {ISendEmailConfirmCodeInterface} from "../interfaces";

export default class MailerMoleculerController extends Service {

  protected mailerService: MailerService;

  constructor(public broker: ServiceBroker) {
    super(broker);
    this.mailerService = new MailerService();
    this.parseServiceSchema({
      name: MAILER_SERVICE_NAME,
      actions: this.actions
    })
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
  async sendEmailConfirmCode(ctx: Context<ISendEmailConfirmCodeInterface>) {
    return this.mailerService.sendEmailConfirmCode(ctx.params);
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
  async sendEmailRecoveryCode(ctx: Context<ISendEmailConfirmCodeInterface>) {
    return this.mailerService.sendAccountRecoveryCode(ctx.params);
  }

}
