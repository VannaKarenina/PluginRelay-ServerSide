import {Injectable} from "@nestjs/common";
import {ServiceBroker} from "moleculer";
import {MoleculerProvider} from "@mmh/gateway/providers";
import {MailerServiceClient} from "@mmh/clients";


@Injectable()
export class TestService {

  protected broker: ServiceBroker;
  protected mailerServiceClient: MailerServiceClient;

  constructor(
    private readonly moleculerProvider: MoleculerProvider
  ) {
    this.broker = this.moleculerProvider.getBroker();
    this.mailerServiceClient = new MailerServiceClient(this.broker);
  }

  async sendEmailConfirm(ctx: {
    email: string,
    login: string,
    code: number
  }) {
    return this.mailerServiceClient.sendVerificationCode(ctx);
  }

}
