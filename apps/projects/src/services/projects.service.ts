import {EntityManager} from "@mikro-orm/postgresql";
import {orm} from "../database/mikro-orm";
import {
  IProjectChangeFavicon,
  IProjectCreate,
  IProjectDelete,
  IProjectEdit, IProjectGetById,
  IProjectNewVersion,
  IProjectVersionFileAdd
} from "@mmh/common";
import {AccountEntity, ProjectsVersionEntity} from "@mmh/entities";
import * as Moleculer from "moleculer";
import MoleculerClientError = Moleculer.Errors.MoleculerClientError;
import MoleculerServerError = Moleculer.Errors.MoleculerServerError;
import {ProjectsEntity} from "@mmh/entities/projects/projects.entity";
import {ProjectCategoryEntity} from "@mmh/entities/projects/project_category.entity";

export default class ProjectsService {

  private initEm: EntityManager;
  private em;

  constructor(broker) {
    this.initEm = orm.em as EntityManager;
    this.em = this.initEm.fork();
  }

  async createNewProject(ctx: IProjectCreate) {

    const {accountId, name, description, category} = ctx;

    const account = await this.em.getRepository(AccountEntity).findOne({id: accountId});

    const projectCategory = await this.em.getRepository(ProjectCategoryEntity).findOne({id: category})

    console.log(projectCategory);

    await projectCategory.projects.init();
    await account.projects.init();

    if (account.projects.length > 5) throw new MoleculerClientError('The maximum number of projects has been reached');

    const project = new ProjectsEntity()
    project.name = name;
    project.description = description;

    account.projects.add(project);
    projectCategory.projects.add(project);

    try {
      this.em.persistAndFlush(account, projectCategory);
    } catch (err) {
      throw new MoleculerServerError('Failed to create project', 400)
    }

    return true;

  }

  async editProject(ctx: IProjectEdit) {

    const {accountId ,id, name, description, category} = ctx;

    try {
      await this.em.transactional(async (em) => {

        const project = await em.getRepository(ProjectsEntity).findOne({id: id});
        const account = await em.getRepository(AccountEntity).findOne({id: accountId})
        const newCategory = await em.getRepository(ProjectCategoryEntity).findOne({id: category});


        if(project.account_id != account.id)
          throw new MoleculerClientError('You not owner of this project', 401);

        project.name = name;
        project.description = description;

        if (project.category != category)
          project.category = newCategory;


        await em.persistAndFlush(project);
      })
    } catch (error) {
      throw new MoleculerServerError('Failed to update project. \n Send this error to support', 400);
    }

    return true;

  }

  async projectFaviconChange(ctx: IProjectChangeFavicon) {

    const {id, favicon} = ctx;

    const project = await this.em.getRepository(ProjectsEntity).findOne({id: id});

    project.favicon_path = favicon;

    try {
      await this.em.persistAndFlush();
    } catch (error) {
      throw new MoleculerServerError('Failed to update project favicon', 901);
    }

    return true;

  }

  async deleteProject(ctx: IProjectDelete) {
    const project = await this.em.getRepository(ProjectsEntity)
      .findOne({id: ctx.id}, {populate: ['versions']});

    try {
      await this.em.remove(project).flush();
    } catch (error) {
      console.log(error);
      throw new MoleculerServerError('Failed to delete project', 902);
    }
  }

  async addNewProjectVersion(ctx: IProjectNewVersion) {

    const {name, description, version, id} = ctx;

    const project = await this.em.getRepository(ProjectsEntity).findOne({id: id});

    if (!project)
      return new MoleculerServerError('Something went wrong wile retrieve project data', 809)

    await project.versions.init();

    const newVersion = new ProjectsVersionEntity()
    newVersion.name = name;
    newVersion.description = description;
    newVersion.version = version;

    project.versions.add(newVersion);

    try {
      await this.em.persistAndFlush(project);
    } catch (e) {
      throw new MoleculerServerError('Failed to add version', 810)
    }

    return newVersion.id;

  }

  async changeProjectVersionFile(ctx: IProjectVersionFileAdd) {

    const {id, fileLocation} = ctx;

    const version = await this.em.getRepository(ProjectsVersionEntity).findOne({id: id});

    version.storage = fileLocation;

    await this.em.persistAndFlush(version)

    return true;

  }

  async getProjectById(ctx: IProjectGetById) {
    return await this.em.getRepository(ProjectsEntity).findOne({id: ctx.id}, {populate: ['versions']})
  }

}
