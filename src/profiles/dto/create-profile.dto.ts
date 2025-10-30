import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsInt,
} from "class-validator";
import { Language, MaturityLevel } from "../../app.constants";

export class CreateProfileDto {
  @IsInt()
  user_id: number;

  @IsString()
  display_name: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsEnum(Language)
  language?: Language;

  @IsOptional()
  @IsEnum(MaturityLevel)
  maturity_level?: MaturityLevel;

  @IsOptional()
  @IsBoolean()
  is_default?: boolean;
}
