import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rating } from "./entities/rating.entity";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>
  ) {}

  async create(dto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingRepo.create({
      ...dto,
      content: { id: dto.content_id },
      profile: { id: dto.profile_id },
    });
    return this.ratingRepo.save(rating);
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingRepo.find({
      relations: ["content", "profile"],
      order: { created_at: "DESC" },
    });
  }

  async findOne(id: number): Promise<Rating> {
    const rating = await this.ratingRepo.findOne({
      where: { id },
      relations: ["content", "profile"],
    });
    if (!rating) throw new NotFoundException("Rating not found");
    return rating;
  }

  async update(id: number, dto: UpdateRatingDto): Promise<Rating> {
    const rating = await this.findOne(id);
    Object.assign(rating, dto);
    return this.ratingRepo.save(rating);
  }

  async remove(id: number): Promise<{ message: string }> {
    const rating = await this.findOne(id);
    await this.ratingRepo.remove(rating);
    return { message: "Rating deleted successfully" };
  }
}
