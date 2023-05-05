import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query, Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {StorageService} from "@mmh/gateway/apps/storage/storage.service";
import * as AWS from "aws-sdk";
import {JwtAuthGuard} from "@mmh/gateway/guards/JwtAuth.guard";

@Controller({
  path: 'storage'
})
export class StorageController {

  constructor(private service: StorageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return  this.service.uploadAvatar(file);
  }

  @Get('getImage')
  async getImage(
    @Query() params: any,
    @Res() res: Response
  ) {
    return this.service.getAvatar(params.key, res)
  }


}
