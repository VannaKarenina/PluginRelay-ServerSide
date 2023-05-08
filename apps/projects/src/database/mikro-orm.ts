import {MikroORM} from "@mikro-orm/core";
import {MikroOrmConfig} from "../configs";

let orm: MikroORM;

async function init() {
  orm = await MikroORM.init(MikroOrmConfig);
}

export { init, orm };
