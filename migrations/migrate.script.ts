import {MikroORM} from "@mikro-orm/postgresql";
import {MikroOrmConfig} from "../mikro-orm.config";
import {logger} from "../libs/common/src";

const args = process.argv.slice(2);

(async () => {
  const orm = await MikroORM.init(MikroOrmConfig);

  const migrator = orm.getMigrator();

  console.log(args);

  if (!args[1]) {
    logger.error('PROVIDE ARG[1] = MIGRATION NAME');
    process.exit(0);
  }

  switch (args[0]) {
    case 'up': {
      await migrator.up(args[1]);
      break;
    }
    case 'down': {
      await migrator.down(args[1]);
      break;
    }
    default: {
      logger.error('PROVIDE ARG[0] = MIGRATION TYPE UP/DOWN');
      process.exit(0);
    }
  }

  await orm.close(true);
})();
