import {
  IAccountChangeAvatar,
  IAccountLoginWithCredentials,
  IAccountPasswordChange,
  IAccountRecoveryConfirm,
  IAccountRecoveryInit,
  IAccountVerification,
  INewAccount
} from "@mmh/common";
import {ServiceBroker} from "moleculer";
import {UserServiceClient} from "@mmh/clients";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {MoleculerProvider} from "@mmh/gateway/providers";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {

  protected broker: ServiceBroker;
  protected userServiceClient: UserServiceClient;

  constructor(
    private readonly moleculerProvider: MoleculerProvider,
    private jwtTokenService: JwtService
  ) {
    this.broker = this.moleculerProvider.getBroker();
    this.userServiceClient = new UserServiceClient(this.broker);
  }


  async createAccount(payload: INewAccount) {
    return this.userServiceClient.createAccount(payload);
  }

  async createAccountVerification(payload: IAccountVerification) {
    return this.userServiceClient.accountVerification(payload);
  }

  async accountRecoveryInit(payload: IAccountRecoveryInit) {
    return this.userServiceClient.accountRecoveryInit(payload);
  }

  async accountConfirmRecovery(payload: IAccountRecoveryConfirm) {
    return  this.userServiceClient.accountRecoveryConfirm(payload);
  }

  async accountChangePassword(payload: IAccountPasswordChange) {
    return this.userServiceClient.accountPasswordChange(payload);
  }

  async accountLoginWithCredentials(ctx: IAccountLoginWithCredentials) {

    const account: any = await this.userServiceClient.accountLoginWithCredentials(ctx);

    if (!account) throw new HttpException(
      'Invalid authorization data LOGIN/PASSWORD',
      HttpStatus.UNAUTHORIZED,
    )

    return {
      access_token: this.jwtTokenService.sign({id: account.id, login: account.login})
    }
  }

  async accountAvatarChange(ctx: IAccountChangeAvatar) {
    return this.userServiceClient.accountChangeAvatar(ctx);
  }
}
