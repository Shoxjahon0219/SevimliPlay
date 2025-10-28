import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsIn,
  Length,
} from "class-validator";

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsIn(["superadmin", "moderator"])
  role?: "superadmin" | "moderator";

  @IsOptional()
  @IsBoolean()
  is_creator?: boolean;
}
