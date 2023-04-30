import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class AccountRecoveryConfirmDto {

  @IsNotEmpty()
  @IsString()
  loginOrEmail: string;

  @IsNotEmpty()
  @IsNumber()
  code: number;

}
