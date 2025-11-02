import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";

export class CreateRatingDto {
  @IsNumber()
  content_id: number;

  @IsNumber()
  profile_id: number;

  @IsEnum(["1", "2", "3", "4", "5"])
  rating: string;

  @IsString()
  @IsNotEmpty()
  review: string;
}
