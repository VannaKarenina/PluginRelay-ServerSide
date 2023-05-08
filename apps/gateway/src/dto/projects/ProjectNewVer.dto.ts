import {IsNumber, IsString} from "class-validator";

export class ProjectNewVerDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  version: string;
  @IsString()
  description: string;
}
