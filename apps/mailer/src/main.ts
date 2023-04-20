import {ServiceBroker} from 'moleculer';
import {brokerConfig} from "./configurations/moleculer.config";
import MailerMoleculerController from "./controllers/mailer-moleculer.controller"
import {MAILER_SERVICE_NAME} from "./constants";

async function bootstrap() {
  const broker = new ServiceBroker(brokerConfig);

  new MailerMoleculerController(broker);

  broker.createService({
    name: MAILER_SERVICE_NAME,
  });

  await broker.start();
}

bootstrap();


