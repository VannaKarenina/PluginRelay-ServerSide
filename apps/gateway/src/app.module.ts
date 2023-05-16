  import {Global, Module} from '@nestjs/common';
  import {UserModule} from "@mmh/gateway/apps/user/user.module";
  import {StorageModule} from "@mmh/gateway/apps/storage";
  import {SharedMoleculerModule} from "@mmh/gateway/shared";
  import {AuthModule} from "@mmh/gateway/shared";
  import {ProjectsModule} from "@mmh/gateway/apps/projects/projects.module";
  import {CategoryModule} from "@mmh/gateway/apps/category/category.module";
  @Module({
    imports: [
      CategoryModule,
      UserModule,
      StorageModule,
      SharedMoleculerModule,
      AuthModule,
      ProjectsModule,
    ],
  })
  export class AppModule {
  }
