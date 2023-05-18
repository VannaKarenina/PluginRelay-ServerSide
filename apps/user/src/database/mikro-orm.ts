import { MikroORM } from '@mikro-orm/core';
import {MikroOrmConfig} from '@mmh/user/configs/mikro-orm.config'

let orm: MikroORM;

async function init() {
  try {
    orm = await MikroORM.init(MikroOrmConfig);
  } catch (e) {
    console.log(e.message);
  }
}

export { init, orm };
