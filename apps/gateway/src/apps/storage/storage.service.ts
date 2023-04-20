import {Injectable} from "@nestjs/common";
import {StorageServiceClient} from "@mmh/clients/storage/storage.service.client";
import {ServiceBroker} from "moleculer";
import {MoleculerProvider} from "@mmh/gateway/providers";


@Injectable()
export class StorageService {

  protected broker: ServiceBroker;
  protected storageServiceClient: StorageServiceClient;

  constructor(
    private readonly moleculerProvider: MoleculerProvider
  ) {
    this.broker = this.moleculerProvider.getBroker();
    this.storageServiceClient = new StorageServiceClient(this.broker);
  }

  async uploadFileToS3(params: {key: string, file: any}) {
    return this.storageServiceClient.uploadFile({
      key: params.key,
      file: {
        originalname: params.file.originalname,
        mimetype: params.file.mimetype,
        buffer:  params.file.buffer.toString('base64'),
        size: 136
      }
    })
  }

}
