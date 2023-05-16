import {Injectable} from "@nestjs/common";
import {ServiceBroker} from "moleculer";
import {s3} from '@mmh/gateway/configs'
import {v4 as uuidv4} from 'uuid';
import {MoleculerProvider} from "@mmh/gateway/providers";
import {UserServiceClient} from "@mmh/clients";
import {ProjectsServiceClient} from "@mmh/clients/projects.service.client";

@Injectable()
export class StorageService {

  protected broker: ServiceBroker;
  protected userServiceClient: UserServiceClient;
  protected projectServiceClient: ProjectsServiceClient;

  constructor(
    private readonly moleculerProvider: MoleculerProvider,
  ) {
    this.broker = this.moleculerProvider.getBroker();
    this.userServiceClient = new UserServiceClient(this.broker);
    this.projectServiceClient = new ProjectsServiceClient(this.broker);
  }

  async uploadAvatar(id: number, file: any) {
    const uuid = uuidv4();
    const upload = await s3.upload({
      Bucket: 'account.avatars',
      Key: `${uuid}.${file.originalname.split('.').pop()}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise();

    try {
      await this.userServiceClient.accountUpdateAvatar({accountId: id, avatarUrl: upload.Key})
    } catch (e) {
      if (e) return false;
    }

    return true;
  }

  async uploadFavicon(id: number, file: any) {
    const uuid = uuidv4();
    const upload = await s3.upload({
      Bucket: 'project.avatars',
      Key: `${uuid}.${file.originalname.split('.').pop()}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise();

    try {
      await this.projectServiceClient.projectFaviconChange({id: id, favicon: upload.Key})
    } catch (e) {
      if (e) return false;
    }

    return true;
  }

  async uploadPlugin(verid: number, file: any) {
    const upload = await s3.upload({
      Bucket: 'project.plugins',
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise();

    try {
      await this.projectServiceClient.changeVersionFile({id: verid, fileLocation: upload.Key})
    } catch (e) {
      console.log(e);
      if (e) return false;
    }

    return true;

  }

  async getAccountAvatar(key: any, res: any) {
    const obj = await s3.getObject({
      Bucket: 'account.avatars',
      Key: key
    }).createReadStream()
    res.set('Content-Type', 'image/jpeg');
    return obj.pipe(res);
  }

  async getProjectAvatar(key: any, res: any) {
    const obj = await s3.getObject({
      Bucket: 'project.avatars',
      Key: key
    }).createReadStream()
    res.set('Content-Type', 'image/jpeg');
    return obj.pipe(res);
  }

  async getCategoryAvatar(key: any, res: any) {
    const obj = await s3.getObject({
      Bucket: 'category.avatars',
      Key: key
    }).createReadStream()
    res.set('Content-Type', 'image/jpeg');
    return obj.pipe(res);
  }

}
