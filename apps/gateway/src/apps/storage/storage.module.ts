import {Module} from "@nestjs/common";
import {StorageController} from "./storage.controller";
import {StorageService} from "./storage.service";
import {MoleculerProvider} from "../../providers/moleculer.provider";

@Module({
  controllers: [StorageController],
  exports: [StorageService],
  providers: [StorageService, MoleculerProvider],
})
export class StorageModule{}
