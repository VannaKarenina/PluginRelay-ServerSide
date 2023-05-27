import {Context, Service, ServiceBroker} from "moleculer";
import ProjectsService from "../services/projects.service";
import {PROJECTS_SERVICE_NAME} from "../constants";
import {Action} from "moleculer-decorators";
import {
  IProjectChangeFavicon,
  IProjectCreate,
  IProjectDelete,
  IProjectEdit, IProjectGetById,
  IProjectNewVersion, IProjectsByCategory,
  IProjectVersionFileAdd
} from "@mmh/common";

export default class ProjectsMoleculerController extends Service {

  private projectsService: ProjectsService;

  constructor(public broker: ServiceBroker) {
    super(broker);
    this.projectsService = new ProjectsService(broker);
    this.parseServiceSchema({
      name: PROJECTS_SERVICE_NAME,
      actions: this.actions
    })
  }

  @Action({
    params: {
      accountId: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      category: {
        type: 'number'
      },
      description: {
        type: 'string'
      }
    }
  })
  async createProject(ctx: Context<IProjectCreate>) {
    return this.projectsService.createNewProject(ctx.params);
  }

  @Action({
    params: {
      accountId: {
        type: "number"
      },
      id: {
        type: "number"
      },
      name: {
        type: "string"
      },
      description: {
        type: "string"
      },
      category: {
        type: "number"
      }
    }
  })
  async editProject(ctx: Context<IProjectEdit>) {
    return this.projectsService.editProject(ctx.params);
  }

  @Action({
    params: {
      id: {
        type: 'number'
      },
      favicon: {
        type: 'string'
      }
    }
  })
  async changeProjectFavicon(ctx: Context<IProjectChangeFavicon>) {
    return this.projectsService.projectFaviconChange(ctx.params);
  }

  @Action({
    params: {
      id: {
        type: 'number'
      }
    }
  })
  async deleteProject(ctx: Context<IProjectDelete>) {
    return this.projectsService.deleteProject(ctx.params);
  }

  @Action({
    params: {
      name: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      version: {
        type: 'string'
      },
      id: {
        type: 'number'
      }
    }
  })
  async addNewVersion(ctx: Context<IProjectNewVersion>) {
    return this.projectsService.addNewProjectVersion(ctx.params);
  }

  @Action({
    params: {
      id: {
        type: "number"
      },
      fileLocation: {
        type: "string"
      }
    }
  })
  async changeVersionFile(ctx: Context<IProjectVersionFileAdd>) {
    return this.projectsService.changeProjectVersionFile(ctx.params);
  }

  @Action({
    params: {
      id: {
        type: "number"
      }
    }
  })
  async getProjectById(ctx: Context<IProjectGetById>) {
    return this.projectsService.getProjectById(ctx.params);
  }

  @Action({
    params: {
      cid: {
        type: "number"
      }
    }
  })
  async getAllInCategory(ctx: Context<IProjectsByCategory>) {
    return this.projectsService.getAllProjectsByCategory(ctx.params);
  }

  @Action({
    params: {
      id: 'number'
    }
  })
  async adjustDownload(ctx: Context<IProjectGetById>) {
    return this.projectsService.adjustProjectDownload(ctx.params);
  }

}
