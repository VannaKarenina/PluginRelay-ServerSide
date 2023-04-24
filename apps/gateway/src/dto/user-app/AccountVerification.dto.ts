import {IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class AccountVerificationDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;

}
