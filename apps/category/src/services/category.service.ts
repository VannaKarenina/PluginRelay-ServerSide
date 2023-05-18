import {Redis} from "ioredis";
import {
  IAccountChangeAvatar, IAccountIDInterface,
  IAccountLoginWithCredentials,
  IAccountPasswordChange,
  IAccountRecoveryConfirm,
  IAccountRecoveryInit,
  IAccountVerification, ICategoryById,
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

  async createCategory() {

  }

  async changeCategoryImg() {

  }

  async getAllCategories() {
    return this.em.getRepository(ProjectCategoryEntity).findAll({populate: ['projects']});
  }

  async getCategoryById(ctx: ICategoryById) {
    return this.em.getRepository(ProjectCategoryEntity).findOne({id: ctx.id},{populate: ['projects']});
  }

  async getProjectsByCategory() {

  }



}
