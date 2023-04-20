import { MikroORM } from '@mikro-orm/core';
import {MikroOrmConfig} from '../configurations/mikro-orm.config'

let orm: MikroORM;

async function init() {
  orm = await MikroORM.init(MikroOrmConfig);
}

export { init, orm };
