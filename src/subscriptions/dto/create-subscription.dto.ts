import {
  IsEnum,
  IsInt,
  IsOptional,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { SubscriptionStatus } from "../../app.constants";

export class CreateSubscriptionDto {
  @IsInt()
  user_id: number;

  @IsInt()
  plan_id: number;

  @IsEnum(SubscriptionStatus)
  @IsOptional()
  status?: SubscriptionStatus = SubscriptionStatus.PENDING;

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsBoolean()
  @IsOptional()
  auto_renew?: boolean = true;
}
