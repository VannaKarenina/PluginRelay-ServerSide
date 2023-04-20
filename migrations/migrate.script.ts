import {MikroORM} from "@mikro-orm/postgresql";
import {MikroOrmConfig} from "../mikro-orm.config";

(async () => {
  const orm = await MikroORM.init(MikroOrmConfig);

  const migrator = orm.getMigrator();

  await migrator.up('initial_plugin_relay'); // runs only given migration, up

  await orm.close(true);
})();
