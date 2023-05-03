import {UserController} from "@mmh/gateway/apps/user/user.controller";
import {UserService} from "@mmh/gateway/apps/user/user.service";
import {Module} from "@nestjs/common";
import {MoleculerProvider} from "@mmh/gateway/providers";
import {SharedMoleculerModule} from "@mmh/gateway/shared/SharedMoleculer.module";
import {AuthModule} from "@mmh/gateway/shared";

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
  imports: [SharedMoleculerModule, AuthModule]
})
export class UserModule{}
