import {Injectable} from "@nestjs/common";
import {ServiceBroker} from "moleculer";


@Injectable()
export class StorageService {

  protected broker: ServiceBroker;

  constructor(
  ) {
  }

  async uploadFileToS3(params: {key: string, file: any}) {

  }

}
