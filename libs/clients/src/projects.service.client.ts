import BaseServiceClient from "@mmh/clients/base/base.service.client";
import {PROJECTS_SERVICE_NAME} from "../../../apps/projects/src/constants";
import {
  IProjectChangeFavicon,
  IProjectCreate,
  IProjectDelete,
  IProjectEdit, IProjectGetById,
  IProjectNewVersion, IProjectsByCategory,
  IProjectVersionFileAdd
} from "@mmh/common";

export class ProjectsServiceClient extends BaseServiceClient {

  serviceName = PROJECTS_SERVICE_NAME;

  constructor(broker) {
    super(broker);
  }

  async createProject(ctx: IProjectCreate) {
    return this.call('createProject', ctx);
  }

  async editProject(ctx: IProjectEdit) {
    return this.call('editProject', ctx);
  }

  async projectFaviconChange(ctx: IProjectChangeFavicon) {
    return this.call('changeProjectFavicon', ctx);
  }

  async deleteProject(ctx: IProjectDelete) {
    return this.call('deleteProject', ctx);
  }

  async addNewVer(ctx: IProjectNewVersion) {
    return this.call('addNewVersion', ctx);
  }

  async changeVersionFile(ctx: IProjectVersionFileAdd) {
    return this.call('changeVersionFile', ctx);
  }

  async getProjectById(ctx: IProjectGetById) {
    return this.call('getProjectById', ctx);
  }

  async getAllByCategory(ctx: IProjectsByCategory) {
    return this.call('getAllInCategory', ctx);
  }

  async adjustDownload(ctx: IProjectGetById) {
    return this.call('adjustDownload', ctx);
  }


}
