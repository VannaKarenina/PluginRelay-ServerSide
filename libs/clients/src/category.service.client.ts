import BaseServiceClient from "@mmh/clients/base/base.service.client";
import {CATEGORY_SERVICE_NAME} from "@mmh/category/constants";
import {ICategoryById} from "@mmh/common";

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

}
