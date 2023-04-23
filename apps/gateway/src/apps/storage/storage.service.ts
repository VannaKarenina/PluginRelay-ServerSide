import {Injectable} from "@nestjs/common";
import {ServiceBroker} from "moleculer";
import {MoleculerProvider} from "@mmh/gateway/providers";


@Injectable()
export class StorageService {

  protected broker: ServiceBroker;

  constructor(
    private readonly moleculerProvider: MoleculerProvider
  ) {
    this.broker = this.moleculerProvider.getBroker();
  }

  async uploadFileToS3(params: {key: string, file: any}) {

  }

}
