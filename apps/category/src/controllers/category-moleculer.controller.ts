import {Service, Context, ServiceBroker} from 'moleculer';

import {Action} from 'moleculer-decorators';

import {CATEGORY_SERVICE_NAME} from "../constants";

import CategoryService from "../services/category.service";
import {ICategoryById, ICategoryImageInterface, ICreateCategory} from "@mmh/common";

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

  @Action({
    params: {
      accid: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      description: {
        type: 'string'
      }
    }
  })
  async createCategory(ctx: Context<ICreateCategory>) {
    return this.categoryService.createCategory(ctx.params)
  }

  @Action({
    params: {
      id: {
        type: 'number'
      },
      path: {
        type: 'string'
      }
    }
  })
  async changeImage(ctx: Context<ICategoryImageInterface>) {
    return this.categoryService.changeCategoryImg(ctx.params);
  }

  @Action({
    params: {
      id: {
        type: "number"
      }
    }
  })
  async delete(ctx: Context<ICategoryById>) {
    return this.categoryService.deleteCategory(ctx.params);
  }


}
