import {ServiceBroker} from "moleculer";
import {MoleculerProvider} from "@mmh/gateway/providers";
import {CategoryServiceClient} from "@mmh/clients";
import {Injectable} from "@nestjs/common";
import {ICategoryById, ICategoryImageInterface, ICreateCategory} from "@mmh/common";

@Injectable()
export class CategoryService {

  protected broker: ServiceBroker;
  protected client: CategoryServiceClient;

  constructor(
    private readonly moleculerProvider: MoleculerProvider,
  ) {
    this.broker = this.moleculerProvider.getBroker();
    this.client = new CategoryServiceClient(this.broker);
  }

  async getAllCategories() {
    return this.client.getAllCategories();
  }

  async getById(ctx: ICategoryById) {
    return this.client.getCategoryById(ctx);
  }

  async createCategory(ctx: ICreateCategory) {
    return this.client.createCategory(ctx);
  }

  async changeImage(ctx: ICategoryImageInterface) {
    return this.client.changeImage(ctx);
  }

  async delete(ctx: ICategoryById) {
    return this.client.delete(ctx);
  }

}
