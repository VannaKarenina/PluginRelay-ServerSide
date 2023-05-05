import {Injectable} from "@nestjs/common";
import {ServiceBroker} from "moleculer";
import {s3} from '@mmh/gateway/configs'
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class StorageService {

  protected broker: ServiceBroker;

  async uploadAvatar(file: any) {
    const uuid = uuidv4();
    return s3.upload({
      Bucket: 'avatars.storage',
      Key: `${uuid}.${file.originalname.split('.').pop()}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise();
  }

  async getAvatar(key: any, res: any) {
    const obj = await s3.getObject({
      Bucket: 'avatars.storage',
      Key: key
    }).createReadStream()
    res.set('Content-Type', 'image/jpeg');
    return obj.pipe(res);
  }

}
