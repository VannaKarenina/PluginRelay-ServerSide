import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {UserService} from "@mmh/gateway/apps/user/user.service";
import {
  AccountChangeAvatarDto,
  AccountChangePasswordDto, AccountLoginDto,
  AccountRecoveryConfirmDto,
  AccountRecoveryInitDto,
  AccountVerificationDto,
  NewAccountDto
} from "@mmh/gateway/dto";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "@mmh/gateway/guards/JwtAuth.guard";

@Controller({
  path: 'account'
})
export class UserController {

  constructor(
    private service: UserService,
    private jwtTokenService: JwtService
  ) {}

  @Post('create')
  async createAccount(
    @Body() payload: NewAccountDto
  ) {
    return this.service.createAccount(payload);
  }

  @Post('verify')
  async verifyAccount(
    @Body() payload: AccountVerificationDto
  ) {
    return this.service.createAccountVerification(payload);
  }

  @Post('recovery')
  async passwordRecovery(
    @Body() payload: AccountRecoveryInitDto
  ) {
    return this.service.accountRecoveryInit(payload);
  }

  @Post('recoveryConfirm')
  async passwordRecoveryConfirm(
    @Body() payload: AccountRecoveryConfirmDto
  ) {
    return this.service.accountConfirmRecovery(payload);
  }

  @Post('changePassword')
  async passwordRecoveryChange(
    @Body() payload: AccountChangePasswordDto
  ) {
    return this.service.accountChangePassword(payload);
  }

  @Post('login')
  async accountLogin(
    @Body() payload: AccountLoginDto
  ) {
    return this.service.accountLoginWithCredentials(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('changeAvatar')
  async accountChangeAvatar(
    @Request() req: any,
    @Body() payload: AccountChangeAvatarDto
  ) {
    return this.service.accountUpdateAvatar({accountId: req.user.accountId, avatarUrl: payload.avatarUrl})
  }

  @UseGuards(JwtAuthGuard)
  @Get('identity')
  async getAccountById(
    @Request() req: any
  ) {
    return this.service.getAccountById({id: req.user.id});
  }

}
