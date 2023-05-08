  import {Global, Module} from '@nestjs/common';
  import {UserModule} from "@mmh/gateway/apps/user/user.module";
  import {StorageModule} from "@mmh/gateway/apps/storage";
  import {SharedMoleculerModule} from "@mmh/gateway/shared";
  import {AuthModule} from "@mmh/gateway/shared";
  import {ProjectsModule} from "@mmh/gateway/apps/projects/projects.module";
  @Module({
    imports: [
      UserModule,
      StorageModule,
      SharedMoleculerModule,
      AuthModule,
      ProjectsModule
    ],
  })
  export class AppModule {
  }
