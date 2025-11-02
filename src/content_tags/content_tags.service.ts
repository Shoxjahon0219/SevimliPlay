import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContentTag } from "./entities/content_tag.entity";
import { CreateContentTagDto } from "./dto/create-content_tag.dto";
import { UpdateContentTagDto } from "./dto/update-content_tag.dto";

@Injectable()
export class ContentTagsService {
  constructor(
    @InjectRepository(ContentTag)
    private readonly contentTagRepo: Repository<ContentTag>
  ) {}

  async create(dto: CreateContentTagDto): Promise<ContentTag> {
    const contentTag = this.contentTagRepo.create({
      content: { id: dto.content_id },
      tag: { id: dto.tag_id },
    });
    return this.contentTagRepo.save(contentTag);
  }

  async findAll(): Promise<ContentTag[]> {
    return this.contentTagRepo.find({
      relations: ["content", "tag"],
    });
  }

  async findOne(id: number): Promise<ContentTag> {
    const contentTag = await this.contentTagRepo.findOne({
      where: { id },
      relations: ["content", "tag"],
    });
    if (!contentTag) throw new NotFoundException("ContentTag not found");
    return contentTag;
  }

  async update(id: number, dto: UpdateContentTagDto): Promise<ContentTag> {
    const contentTag = await this.findOne(id);
    Object.assign(contentTag, {
      content: dto.content_id ? { id: dto.content_id } : contentTag.content,
      tag: dto.tag_id ? { id: dto.tag_id } : contentTag.tag,
    });
    return this.contentTagRepo.save(contentTag);
  }

  async remove(id: number): Promise<{ message: string }> {
    const contentTag = await this.findOne(id);
    await this.contentTagRepo.remove(contentTag);
    return { message: "ContentTag deleted successfully" };
  }
}
