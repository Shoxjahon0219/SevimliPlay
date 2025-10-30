import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Length(6, 255)
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  refresh_token?: string;

  @IsOptional()
  @IsBoolean()
  is_email_verified?: boolean;
}
