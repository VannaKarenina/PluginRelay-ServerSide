import {IsNotEmpty, IsNumber} from "class-validator";

export class CategoryByIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
