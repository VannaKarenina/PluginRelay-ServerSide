import {IsNotEmpty, IsString} from "class-validator";

export class AccountRecoveryInitDto {
  @IsNotEmpty()
  @IsString()
  loginOrEmail: string
}
