import {Injectable} from "@nestjs/common";
import {
  IProjectChangeFavicon,
  IProjectCreate,
  IProjectDelete,
  IProjectEdit,
  IProjectGetById,
  IProjectNewVersion, IProjectsByCategory
} from "@mmh/common";
import {ServiceBroker} from "moleculer";
import {ProjectsServiceClient} from "@mmh/clients/projects.service.client";
import {MoleculerProvider} from "@mmh/gateway/providers";

@Injectable()
export class ProjectsService {

  protected broker: ServiceBroker;
  protected projectServiceClient: ProjectsServiceClient;

  constructor(
    private readonly moleculerProvider: MoleculerProvider
  ) {
    this.broker = this.moleculerProvider.getBroker();
    this.projectServiceClient = new ProjectsServiceClient(this.broker);
  }


  async createProject(ctx: IProjectCreate) {
    return this.projectServiceClient.createProject(ctx);
  }

  async editProject(ctx: IProjectEdit) {
    return this.projectServiceClient.editProject(ctx);
  }

  async deleteProject(ctx: IProjectDelete) {
    return this.projectServiceClient.deleteProject(ctx);
  }

  async getProjectById(ctx: IProjectGetById) {
    return this.projectServiceClient.getProjectById(ctx);
  }
  async addNewVersion(ctx: IProjectNewVersion) {
    return this.projectServiceClient.addNewVer(ctx);
  }

  async getByCid(ctx: IProjectsByCategory) {
    return this.projectServiceClient.getAllByCategory(ctx);
  }

}
