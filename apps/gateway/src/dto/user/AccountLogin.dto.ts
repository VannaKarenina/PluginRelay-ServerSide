import {IsNotEmpty, IsString} from "class-validator";

export class AccountLoginDto {

  @IsNotEmpty()
  @IsString()
  loginOrEmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;

}
