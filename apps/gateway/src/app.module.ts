  import {Global, Module} from '@nestjs/common';
  import {UserModule} from "@mmh/gateway/apps/user/user.module";
  import {StorageModule} from "@mmh/gateway/apps/storage";
  import {MoleculerProvider} from "@mmh/gateway/providers";
  import {SharedMoleculerModule} from "@mmh/gateway/shared/SharedMoleculer.module";
  @Module({
    imports: [
      UserModule,
      StorageModule,
      SharedMoleculerModule
    ],
  })
  export class AppModule {
  }
