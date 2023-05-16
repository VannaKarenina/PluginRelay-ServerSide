import {Service, Context, ServiceBroker} from 'moleculer';

import {Action} from 'moleculer-decorators';

import {CATEGORY_SERVICE_NAME} from "../constants";

import CategoryService from "../services/category.service";
import {ICategoryById} from "@mmh/common";

export default class CategoryMoleculerController extends Service {

  protected categoryService: CategoryService;

  constructor(public broker: ServiceBroker) {
    super(broker);
    this.categoryService = new CategoryService(broker);
    this.parseServiceSchema({
      name: CATEGORY_SERVICE_NAME,
      actions: this.actions
    })
  }

  @Action()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Action({
    params: {
      id: {
        type: "number"
      }
    }
  })
  async getCategoryById(ctx: Context<ICategoryById>) {
    return this.categoryService.getCategoryById(ctx.params);
  }


}
