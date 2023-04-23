import {UserController} from "@mmh/gateway/apps/user/user.controller";
import {UserService} from "@mmh/gateway/apps/user/user.service";
import {MoleculerProvider} from "@mmh/gateway/providers";
import {Module} from "@nestjs/common";

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, MoleculerProvider]
})
export class UserModule{}
