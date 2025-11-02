import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { ContentTagsService } from "./content_tags.service";
import { CreateContentTagDto } from "./dto/create-content_tag.dto";
import { UpdateContentTagDto } from "./dto/update-content_tag.dto";

@Controller("content-tags")
export class ContentTagsController {
  constructor(private readonly contentTagsService: ContentTagsService) {}

  @Post()
  create(@Body() dto: CreateContentTagDto) {
    return this.contentTagsService.create(dto);
  }

  @Get()
  findAll() {
    return this.contentTagsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.contentTagsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentTagDto
  ) {
    return this.contentTagsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.contentTagsService.remove(id);
  }
}
