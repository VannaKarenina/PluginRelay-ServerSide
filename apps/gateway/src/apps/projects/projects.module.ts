import {Module} from "@nestjs/common";
import {AuthModule, SharedMoleculerModule} from "@mmh/gateway/shared";
import {ProjectsController} from "@mmh/gateway/apps/projects/projects.controller";
import {ProjectsService} from "@mmh/gateway/apps/projects/projects.service";

@Module({
  controllers: [ProjectsController],
  exports: [ProjectsService],
  providers: [ProjectsService],
  imports: [SharedMoleculerModule, AuthModule]
})
export class ProjectsModule{}
