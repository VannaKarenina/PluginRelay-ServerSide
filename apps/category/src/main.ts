import {ServiceBroker} from 'moleculer';
import {brokerConfig} from "./configs";
import CategoryMoleculerController from "./controllers/category-moleculer.controller"
import {CATEGORY_SERVICE_NAME} from "./constants";
import {init} from "./database/mikro-orm";

async function bootstrap() {
  await init();

  const broker = new ServiceBroker(brokerConfig);

  new CategoryMoleculerController(broker);

  broker.createService({
    name: CATEGORY_SERVICE_NAME,
  });

  await broker.start();
}
bootstrap();


