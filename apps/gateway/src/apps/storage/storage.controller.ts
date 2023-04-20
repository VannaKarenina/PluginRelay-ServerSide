import {Body, Controller, Get, Inject, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {StorageService} from "@mmh/gateway/apps/storage/storage.service";
import * as AWS from "aws-sdk";
import {storage} from "@mmh/storage/storage";

@Controller({
  path: 'storage'
})
export class StorageController {

  constructor(private service: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body('key') key: string) {
    return  storage.upload({
      Bucket: 'plugins.storage',
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }).promise();
  }

  @Get('test')
  async test() {
    return 'work';
  }


}
