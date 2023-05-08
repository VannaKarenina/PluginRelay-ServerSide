
import {ServiceBroker} from "moleculer";
import {init} from "./database/mikro-orm";
import {brokerConfig} from "./configs";
import {PROJECTS_SERVICE_NAME} from "./constants";
import ProjectsMoleculerController from "./controllers/projects-moleculer.controller";

async function bootstrap() {

  await init();

  const broker = new ServiceBroker(brokerConfig);

  new ProjectsMoleculerController(broker);

  broker.createService({
    name: PROJECTS_SERVICE_NAME,
  });

  await broker.start();
}
bootstrap();
