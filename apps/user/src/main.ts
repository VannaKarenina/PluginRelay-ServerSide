import {ServiceBroker} from 'moleculer';
import {brokerConfig} from "./configurations";
import UserMoleculerController from "./controllers/user-moleculer.controller"
import {USER_SERVICE_NAME} from "./constants";
import {init} from "./database/mikro-orm";

async function bootstrap() {
  await init();

  const broker = new ServiceBroker(brokerConfig);

  new UserMoleculerController(broker);

  broker.createService({
    name: USER_SERVICE_NAME,
  });

  await broker.start();
}
bootstrap();


