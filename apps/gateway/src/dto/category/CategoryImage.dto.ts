import {IsNotEmpty, IsNumber, IsString} from "class-validator";
export class CategoryImageDto {
  @IsNumber()
  @IsNotEmpty()
  id:number;
  @IsString()
  @IsNotEmpty()
  path: string;
}
