import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {ProjectCreateDto, ProjectEditDto, ProjectNewVerDto} from "@mmh/gateway/dto";
import {ProjectsService} from "@mmh/gateway/apps/projects/projects.service";
import {JwtAuthGuard} from "@mmh/gateway/guards/JwtAuth.guard";

@Controller({
  path: 'project'
})
export class ProjectsController {

  constructor(private service: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProject(
    @Body() payload: ProjectCreateDto
  ) {
    return this.service.createProject(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit')
  async editProject(
      @Body() payload: ProjectEditDto
  ) {
    return this.service.editProject(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('newVer')
  async newVersion(
    @Body() payload: ProjectNewVerDto
  ) {
    return this.service.addNewVersion(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteProject(
    @Body() payload: any
  ) {
    return this.service.deleteProject({id: payload.id});
  }

  @UseGuards(JwtAuthGuard)
  @Get(':pid')
  async getProjectById(
    @Param('pid') pid: string
  ) {
    return this.service.getProjectById({id: parseInt(pid)});
  }

}
