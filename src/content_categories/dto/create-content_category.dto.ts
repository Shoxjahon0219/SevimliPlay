import { IsInt, IsNotEmpty } from "class-validator";

export class CreateContentCategoryDto {
  @IsNotEmpty()
  @IsInt()
  content_id: number;

  @IsNotEmpty()
  @IsInt()
  category_id: number;
}
