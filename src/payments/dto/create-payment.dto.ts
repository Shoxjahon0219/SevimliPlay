import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Currency, PaymentStatus } from "../../app.constants";

export class CreatePaymentDto {
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsInt()
  subscription_id?: number;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  transaction_id?: string;

  @IsInt()
  amount: number;

  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;
}
