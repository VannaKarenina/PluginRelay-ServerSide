import BaseServiceClient from "@mmh/clients/base/base.service.client";
import {STORAGE_SERVICE_NAME} from "@mmh/storage/constants";

export class StorageServiceClient extends BaseServiceClient {

  serviceName = STORAGE_SERVICE_NAME;

  constructor(broker) {
    super(broker);
  }

  uploadFile(ctx: {
    key: string,
    file: object
  }) {
    return this.call('uploadFile', ctx)
  }

}
