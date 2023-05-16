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
  UseInterceptors,
  Request
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
  @Post('uploadAccountImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Request() req: any,
    @UploadedFile() file) {
    return  this.service.uploadAvatar(req.user.id ,file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('uploadProjectFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProjectFile(
    @Request() req: any,
    @Body() payload: any,
    @UploadedFile() file) {
    return  this.service.uploadPlugin(parseInt(payload.id) ,file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('uploadProjectFavicon')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProjectFavicon(
    @Request() req: any,
    @Body() payload: any,
    @UploadedFile() file) {
    return  this.service.uploadFavicon(parseInt(payload.id) ,file);
  }

  @Get('getAccountImage')
  async getAccountImage(
    @Query() params: any,
    @Res() res: Response
  ) {
    return this.service.getAccountAvatar(params.key, res);
  }

  @Get('getProjectAvatar')
  async getProjectAvatar(
    @Query() params: any,
    @Res() res: Response
  ) {
    return this.service.getProjectAvatar(params.key, res);
  }

  @Get('getCategoryAvatar')
  async getCategoryAvatar(
    @Query() params: any,
    @Res() res: Response
  ) {
    return this.service.getCategoryAvatar(params.key, res);
  }



}
