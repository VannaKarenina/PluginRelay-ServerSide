import BaseServiceClient from "@mmh/clients/base/base.service.client";
import {CATEGORY_SERVICE_NAME} from "@mmh/category/constants";
import {ICategoryById, ICategoryImageInterface, ICreateCategory} from "@mmh/common";

export class CategoryServiceClient extends BaseServiceClient {

  serviceName = CATEGORY_SERVICE_NAME

  constructor(broker) {
    super(broker);
  }

  async getAllCategories() {
    return this.call('getAllCategories');
  }

  async getCategoryById(ctx: ICategoryById) {
    return this.call('getCategoryById', ctx);
  }

  async createCategory(ctx: ICreateCategory) {
    return this.call('createCategory', ctx);
  }

  async changeImage(ctx: ICategoryImageInterface) {
    return this.call('changeImage', ctx);
  }

  async delete(ctx: ICategoryById) {
    return this.call('delete', ctx);
  }

}
