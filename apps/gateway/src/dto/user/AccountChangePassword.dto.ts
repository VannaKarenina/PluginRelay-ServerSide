import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class AccountChangePasswordDto {

  @IsNotEmpty()
  @IsString()
  loginOrEmail: string;

  @IsNotEmpty()
  @IsNumber()
  signature: number;

  @IsNotEmpty()
  @IsString()
  password: string;

}
