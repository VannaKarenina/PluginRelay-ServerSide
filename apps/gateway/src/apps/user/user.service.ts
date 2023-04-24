import {
  IAccountChangeAvatar, IAccountLoginByCredentials,
  IAccountNewPassword,
  IAccountPasswordRecovery,
  IAccountVerification,
  INewAccount
} from "@mmh/common";
import {ServiceBroker} from "moleculer";
import {UserServiceClient} from "@mmh/clients";
import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {MoleculerProvider} from "@mmh/gateway/providers";

@Injectable()
export class UserService {

  protected broker: ServiceBroker;
  protected userServiceClient: UserServiceClient;

  constructor(
    private readonly moleculerProvider: MoleculerProvider
  ) {
    this.broker = this.moleculerProvider.getBroker();
    this.userServiceClient = new UserServiceClient(this.broker);
  }


  async createAccount(payload: INewAccount) {
    return this.userServiceClient.createAccount(payload);
  }

  async createAccountVerification(payload: IAccountVerification) {
    return this.userServiceClient.accountCreationVerification(payload);
  }

  async accountRecoveryPassword(loginOrEmail: string) {
    return this.userServiceClient.accountPasswordRecovery(loginOrEmail);
  }

  async accountConfirmRecovery(ctx: IAccountPasswordRecovery) {
    return  this.userServiceClient.accountRecoveryConfirm(ctx);
  }

  async accountChangePassword(ctx: IAccountNewPassword) {
    return this.userServiceClient.accountPasswordChange(ctx);
  }

  async accountAvatarChange(ctx: IAccountChangeAvatar) {
    return this.userServiceClient.accountChangeAvatar(ctx);
  }

  async accountLoginByLOR(ctx: IAccountLoginByCredentials) {
    return this.userServiceClient.accountLoginByLOR(ctx);
  }

}
