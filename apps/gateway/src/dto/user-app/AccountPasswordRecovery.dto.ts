import {IsNotEmpty, IsString} from "class-validator";

export class AccountPasswordRecoveryDto {

  @IsNotEmpty()
  @IsString()
  loginOrEmail: string;

}
