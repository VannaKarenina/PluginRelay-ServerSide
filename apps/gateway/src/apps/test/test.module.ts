import {Module} from "@nestjs/common";
import {TestController} from "./test.controller";
import {TestService} from "./test.service";
import {MoleculerProvider} from "@mmh/gateway/providers";

@Module({
  controllers: [TestController],
  exports: [TestService],
  providers: [TestService, MoleculerProvider],
})
export class TestModule {}
