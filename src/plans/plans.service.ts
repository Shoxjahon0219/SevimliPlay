import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Plan } from "./entities/plan.entity";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { UpdatePlanDto } from "./dto/update-plan.dto";

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = this.planRepository.create(createPlanDto);
    return await this.planRepository.save(plan);
  }

  async findAll(): Promise<Plan[]> {
    return await this.planRepository.find();
  }

  async findOne(id: number): Promise<Plan> {
    const plan = await this.planRepository.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`Plan with ID ${id} not found`);
    return plan;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    const plan = await this.findOne(id);
    const updated = Object.assign(plan, updatePlanDto);
    return await this.planRepository.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const plan = await this.findOne(id);
    await this.planRepository.remove(plan);
    return { message: "Plan deleted successfully" };
  }
}
