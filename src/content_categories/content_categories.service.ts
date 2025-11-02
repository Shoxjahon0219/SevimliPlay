import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContentCategory } from "./entities/content_category.entity";
import { CreateContentCategoryDto } from "./dto/create-content_category.dto";
import { UpdateContentCategoryDto } from "./dto/update-content_category.dto";

@Injectable()
export class ContentCategoriesService {
  constructor(
    @InjectRepository(ContentCategory)
    private readonly contentCategoryRepo: Repository<ContentCategory>
  ) {}

  async create(dto: CreateContentCategoryDto): Promise<ContentCategory> {
    const contentCategory = this.contentCategoryRepo.create({
      content: { id: dto.content_id },
      category: { id: dto.category_id },
    });
    return this.contentCategoryRepo.save(contentCategory);
  }

  async findAll(): Promise<ContentCategory[]> {
    return this.contentCategoryRepo.find({
      relations: ["content", "category"],
    });
  }

  async findOne(id: number): Promise<ContentCategory> {
    const contentCategory = await this.contentCategoryRepo.findOne({
      where: { id },
      relations: ["content", "category"],
    });
    if (!contentCategory)
      throw new NotFoundException("ContentCategory not found");
    return contentCategory;
  }

  async update(
    id: number,
    dto: UpdateContentCategoryDto
  ): Promise<ContentCategory> {
    const contentCategory = await this.findOne(id);
    Object.assign(contentCategory, {
      content: dto.content_id
        ? { id: dto.content_id }
        : contentCategory.content,
      category: dto.category_id
        ? { id: dto.category_id }
        : contentCategory.category,
    });
    return this.contentCategoryRepo.save(contentCategory);
  }

  async remove(id: number): Promise<{ message: string }> {
    const contentCategory = await this.findOne(id);
    await this.contentCategoryRepo.remove(contentCategory);
    return { message: "ContentCategory deleted successfully" };
  }
}
