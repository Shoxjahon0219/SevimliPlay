import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
} from "class-validator";
import { DeviceType } from "../entities/device.entity";

export class CreateDeviceDto {
  @IsInt()
  profile_id: number;

  @IsString()
  device_name: string;

  @IsOptional()
  @IsEnum(DeviceType)
  device_type?: DeviceType;

  @IsOptional()
  @IsString()
  ip_address?: string;

  @IsOptional()
  @IsString()
  user_agent?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
