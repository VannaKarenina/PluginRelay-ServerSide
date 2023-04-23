import {IsString, IsNotEmpty} from 'class-validator';
export class NewAccountDto {

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;


}
