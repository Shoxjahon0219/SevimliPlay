import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { BillingPeriod, VideoQuality, Currency } from "../../app.constants";

export class CreatePlanDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency = Currency.USD;

  @IsEnum(BillingPeriod)
  @IsOptional()
  billing_period?: BillingPeriod = BillingPeriod.MONTHLY;

  @IsEnum(VideoQuality)
  @IsOptional()
  video_quality?: VideoQuality = VideoQuality.HD;

  @IsInt()
  @IsOptional()
  max_profiles?: number = 1;

  @IsInt()
  @IsOptional()
  concurrent_streams?: number = 1;
}
