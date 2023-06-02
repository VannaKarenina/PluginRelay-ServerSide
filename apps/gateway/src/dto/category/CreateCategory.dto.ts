import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCategoryDto {

  @IsNumber()
  @IsNotEmpty()
  accid: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

}
