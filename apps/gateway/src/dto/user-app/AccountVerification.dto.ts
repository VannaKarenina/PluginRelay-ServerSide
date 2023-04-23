import {IsString, IsNotEmpty} from 'class-validator';

export class AccountVerificationDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: number;

}
