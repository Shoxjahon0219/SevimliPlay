import { IsEnum, IsOptional, IsString, IsBoolean } from "class-validator";
import { ContentType } from "../../app.constants";

export class CreateContentDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ContentType)
  type?: ContentType;

  @IsOptional()
  @IsString()
  thumbnail_url?: string;

  @IsOptional()
  @IsString()
  content_url?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
