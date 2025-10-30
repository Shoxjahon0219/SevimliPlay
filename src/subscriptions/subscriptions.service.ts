import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscription } from "./entities/subscription.entity";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { User } from "../users/entities/user.entity";
import { Plan } from "../plans/entities/plan.entity";

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto
  ): Promise<Subscription> {
    const user = await this.userRepository.findOne({
      where: { id: createSubscriptionDto.user_id },
    });
    const plan = await this.planRepository.findOne({
      where: { id: createSubscriptionDto.plan_id },
    });

    if (!user) throw new NotFoundException("User not found");
    if (!plan) throw new NotFoundException("Plan not found");

    const subscription = this.subscriptionRepository.create({
      user,
      plan,
      ...createSubscriptionDto,
    });

    return await this.subscriptionRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({
      relations: ["user", "plan"],
    });
  }

  async findOne(id: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ["user", "plan"],
    });
    if (!subscription)
      throw new NotFoundException(`Subscription ${id} not found`);
    return subscription;
  }

  async update(id: number, dto: UpdateSubscriptionDto): Promise<Subscription> {
    const subscription = await this.findOne(id);
    Object.assign(subscription, dto);
    return await this.subscriptionRepository.save(subscription);
  }

  async remove(id: number): Promise<{ message: string }> {
    const subscription = await this.findOne(id);
    await this.subscriptionRepository.remove(subscription);
    return { message: "Subscription deleted successfully" };
  }
}
