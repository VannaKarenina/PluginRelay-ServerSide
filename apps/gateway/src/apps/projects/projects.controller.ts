import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {ProjectCreateDto, ProjectEditDto, ProjectEditVersionDto, ProjectNewVerDto} from "@mmh/gateway/dto";
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
  @Post('deleteVersion')
  async deleteVersion(
    @Body() payload: any
  ) {
    return this.service.deleteVersion({id: payload.id});
  }

  @UseGuards(JwtAuthGuard)
  @Post('editVersion')
  async editVersion(
    @Body() payload: ProjectEditVersionDto
  ) {
    return this.service.editVersion(payload);
  }

  @Get(':pid')
  async getProjectById(
    @Param('pid') pid: string
  ) {
    return this.service.getProjectById({id: parseInt(pid)});
  }

  @Get("category/:cid")
  async getByCategory(
    @Param('cid') cid: string
  ) {
    return this.service.getByCid({cid: parseInt(cid)});
  }

  @Get("projects/:cid")
  async getByAccountId(
    @Param('cid') cid: string
  ) {
    return this.service.getAllByAccountId({id: parseInt(cid)});
  }

  @Get("version/:cid")
  async getVerById(
    @Param('cid') cid: string
  ) {
    return await this.service.getVerById({id: parseInt(cid)});
  }


}
