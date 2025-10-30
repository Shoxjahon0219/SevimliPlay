import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./entities/payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepo.create({
      ...dto,
      user: { id: dto.user_id },
      subscription: dto.subscription_id ? { id: dto.subscription_id } : undefined,
    });
    return this.paymentRepo.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find({
      relations: ["user", "subscription"],
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ["user", "subscription"],
    });
    if (!payment) throw new NotFoundException("Payment not found");
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);
    Object.assign(payment, dto);
    return this.paymentRepo.save(payment);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await this.paymentRepo.remove(payment);
    return { message: "Payment deleted successfully" };
  }
}
