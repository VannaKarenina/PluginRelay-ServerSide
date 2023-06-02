import {Redis} from "ioredis";
import {
  IAccountChangeAvatar, IAccountIDInterface,
  IAccountLoginWithCredentials,
  IAccountPasswordChange,
  IAccountRecoveryConfirm,
  IAccountRecoveryInit,
  IAccountVerification, ICategoryById, ICategoryImageInterface, ICreateCategory,
  INewAccount
} from "@mmh/common/shared/interfaces";
import { redisUrl } from "@mmh/common/utils/redis";
import { EntityManager } from "@mikro-orm/postgresql";
import {orm} from "../database/mikro-orm";
import {AccountEntity, ProjectCategoryEntity} from '@mmh/entities'

export default class CategoryService {

  private initEm: EntityManager;
  private em;
  private redisInstance: Redis;

  constructor(broker) {
    this.initEm = orm.em as EntityManager;
    this.em = this.initEm.fork();
    this.redisInstance = new Redis(redisUrl)
  }

  async createCategory(ctx: ICreateCategory) {

    const account = this.em.getRepository(AccountEntity).findOne({
      id: ctx.accid
    })

    if (account.moderation_level < 1) {
      return {
        code: 808,
        message: 'No access'
      }
    }

    const category = new ProjectCategoryEntity()
    category.name = ctx.name;
    category.description = ctx.description;


    try {
      await this.em.persistAndFlush(category);

      return category.id
    } catch (e) {
      return {
        code: 809,
        message: 'Failed to create category'
      }
    }


  }

  async changeCategoryImg(ctx: ICategoryImageInterface) {
    const category = await this.em.getRepository(ProjectCategoryEntity).findOne({id: ctx.id});

    category.image = ctx.path;

    try {
      await this.em.persistAndFlush();

      return {
        code: 801
      }
    } catch (e) {
      return {
        code: 808,
        message: 'Failed adjust category mediaw'
      }
    }
  }

  async getAllCategories() {
    return this.em.getRepository(ProjectCategoryEntity).findAll({populate: ['projects']});
  }

  async getCategoryById(ctx: ICategoryById) {
    return this.em.getRepository(ProjectCategoryEntity).findOne({id: ctx.id},{populate: ['projects']});
  }

  async deleteCategory(ctx: ICategoryById) {
    const category = await this.em.getRepository(ProjectCategoryEntity).findOne({id: ctx.id});

    try {
      if (category) {
        await this.em.removeAndFlush(category);
      }

      return {
        code: 801,
        message: 'Category remooved'
      }
    } catch (e) {
      return {
        code: 808,
        message: 'Failed'
      }
    }
  }

  async getProjectsByCategory() {

  }



}
