import {Module} from '@nestjs/common';
import {TestModule} from "@mmh/gateway/apps/test";
import {UserModule} from "@mmh/gateway/apps/user/user.module";
@Module({
  imports: [
    TestModule,
    UserModule
  ]
})
export class AppModule {}
