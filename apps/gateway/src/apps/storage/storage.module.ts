import {Module} from "@nestjs/common";
import {StorageController} from "./storage.controller";
import {StorageService} from "./storage.service";
import {SharedMoleculerModule} from "@mmh/gateway/shared/SharedMoleculer.module";
import {AuthModule} from "@mmh/gateway/shared";

@Module({
  controllers: [StorageController],
  exports: [StorageService],
  providers: [StorageService],
  imports: [SharedMoleculerModule, AuthModule]
})
export class StorageModule{}
