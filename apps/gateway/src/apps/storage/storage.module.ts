import {Module} from "@nestjs/common";
import {StorageController} from "./storage.controller";
import {StorageService} from "./storage.service";
import {SharedMoleculerModule} from "@mmh/gateway/shared/SharedMoleculer.module";

@Module({
  controllers: [StorageController],
  exports: [StorageService],
  providers: [StorageService],
  imports: [SharedMoleculerModule]
})
export class StorageModule{}
