import { IsInt, IsNotEmpty } from "class-validator";

export class CreateContentTagDto {
  @IsNotEmpty()
  @IsInt()
  content_id: number;

  @IsNotEmpty()
  @IsInt()
  tag_id: number;
}
