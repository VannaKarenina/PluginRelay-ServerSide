import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ServiceBroker} from "moleculer";
import {s3} from '@mmh/gateway/configs'
import {v4 as uuidv4} from 'uuid';
import {MoleculerProvider} from "@mmh/gateway/providers";
import {CategoryServiceClient, UserServiceClient} from "@mmh/clients";
import {ProjectsServiceClient} from "@mmh/clients/projects.service.client";

@Injectable()
export class StorageService {

  protected broker: ServiceBroker;
  protected userServiceClient: UserServiceClient;
  protected projectServiceClient: ProjectsServiceClient;
  protected categoryServiceClient: CategoryServiceClient;

  constructor(
    private readonly moleculerProvider: MoleculerProvider,
  ) {
    this.broker = this.moleculerProvider.getBroker();
    this.userServiceClient = new UserServiceClient(this.broker);
    this.projectServiceClient = new ProjectsServiceClient(this.broker);
    this.categoryServiceClient = new CategoryServiceClient(this.broker);
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

    const project: any = await this.projectServiceClient.getProjectById({id: id});


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

  async uploadGameImage(id: number, file: any) {

    const uuid = uuidv4();

    const upload = await s3.upload({
      Bucket: 'category.avatars',
      Key: `${uuid}.${file.originalname.split('.').pop()}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise();

    try {
      await this.categoryServiceClient.changeImage({id: id, path: upload.Key})
    } catch (e) {
      if (e) return false;
    }

    return true;
  }

  async uploadPlugin(verid: number, file: any) {

    if (file.mimetype == 'application/octet-stream') {
      file.mimetype = 'application/java-archive'
    }

    const version: any = await this.projectServiceClient.getVerById({id: verid});

    if (version.storage != null) {
      await s3.deleteObject({
        Bucket: 'project.plugins',
        Key: version.storage,
      }).promise();
    }

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
    if (key) {
      try {
        await s3.headObject({
          Bucket: 'account.avatars',
          Key: key
        }).promise()

        const obj = await s3.getObject({
          Bucket: 'account.avatars',
          Key: key
        }).createReadStream()
        res.set('Content-Type', 'image/jpeg');
        return obj.pipe(res);

      } catch (e) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getProjectAvatar(key: any, res: any) {
    if (key) {
      try {
        await s3.headObject({
          Bucket: 'project.avatars',
          Key: key
        }).promise()

        const obj = await s3.getObject({
          Bucket: 'project.avatars',
          Key: key
        }).createReadStream()
        res.set('Content-Type', 'image/jpeg');
        return obj.pipe(res);

      } catch (e) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getCategoryAvatar(key: any, res: any) {
    if (key) {
      console.log(key)
      try {
        await s3.headObject({
          Bucket: 'category.avatars',
          Key: key
        }).promise()

        const obj = await s3.getObject({
          Bucket: 'category.avatars',
          Key: key
        }).createReadStream();
        res.set('Content-Type', 'image/jpeg');
        return obj.pipe(res);

      } catch (e) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async isObjExist(key: string, bucket: string) {
    try {
      console.log(await s3.headObject({
        Bucket: bucket,
        Key: key
      }).promise())
      // Object exists
      return true;
    } catch (error) {
      if (error.code === 'NotFound') {
        // Object does not exist
        return false;
      } else {
        console.error('Error checking object existence:', error);
        // Return an appropriate value or throw an error based on your use case
        throw error;
      }
    }
  }

  async donwloadProjectFile(key: string, pid:number, res: any) {
    console.log({key, pid})
    try {
      await this.projectServiceClient.adjustDownload({id: pid})
      const fileStream = s3.getObject({
        Bucket: 'project.plugins',
        Key: key,
      }).createReadStream();
      res.attachment(key); // Set the filename for the response
      return fileStream.pipe(res); // Pipe the file stream to the response
    } catch (err) {
      console.log(err)
      // Handle any errors that occur during the file retrieval
      res.status(500).send('Error retrieving file from S3');
    }
  }

}
