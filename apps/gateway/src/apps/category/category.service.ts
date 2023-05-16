import {ServiceBroker} from "moleculer";
import {MoleculerProvider} from "@mmh/gateway/providers";
import {CategoryServiceClient} from "@mmh/clients";
import {Injectable} from "@nestjs/common";
import {ICategoryById} from "@mmh/common";

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

}
