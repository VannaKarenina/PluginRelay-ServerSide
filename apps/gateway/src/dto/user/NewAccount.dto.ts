import {IsNotEmpty, IsString} from "class-validator";

export class NewAccountDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
