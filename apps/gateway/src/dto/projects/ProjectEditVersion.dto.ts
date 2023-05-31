import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ProjectEditVersionDto {

  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  version: string;

}
