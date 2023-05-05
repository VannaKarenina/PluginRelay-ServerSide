import {IsNotEmpty, IsString} from "class-validator";

export class AccountChangeAvatarDto {

  @IsString()
  @IsNotEmpty()
  avatarUrl: string;

}
