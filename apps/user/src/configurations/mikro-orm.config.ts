import {
  EntityCaseNamingStrategy,
  NullCacheAdapter,
  Options,
} from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";

const { DB_HOST, DB_PORT, DB_PASSWORD, DB_USER, DB_DATABASE } = process.env;

export const MikroOrmConfig: Options = {
  driver: PostgreSqlDriver,
  entities: [],
  dbName: DB_DATABASE,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  highlighter: new SqlHighlighter(),
  debug: process.env.NODE_ENV !== 'production',
  baseDir: process.cwd(),
  cache: { enabled: false },
  validateRequired: false,
  namingStrategy: EntityCaseNamingStrategy,
  resultCache: { adapter: NullCacheAdapter },
  autoJoinOneToOneOwner: false,
  migrations: {
    tableName: 'migrations',
    path: '../database/migrations',
  },
  discovery: {
    warnWhenNoEntities: false
  }
};
