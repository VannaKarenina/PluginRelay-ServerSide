import {Module} from '@nestjs/common';
import {TestModule} from "@mmh/gateway/apps/test";
@Module({
  imports: [
    TestModule
  ]
})
export class AppModule {}
