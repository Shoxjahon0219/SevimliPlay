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
import { ContentCategoriesService } from "./content_categories.service";
import { CreateContentCategoryDto } from "./dto/create-content_category.dto";
import { UpdateContentCategoryDto } from "./dto/update-content_category.dto";

@Controller("content-categories")
export class ContentCategoriesController {
  constructor(
    private readonly contentCategoriesService: ContentCategoriesService
  ) {}

  @Post()
  create(@Body() dto: CreateContentCategoryDto) {
    return this.contentCategoriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.contentCategoriesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.contentCategoriesService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentCategoryDto
  ) {
    return this.contentCategoriesService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.contentCategoriesService.remove(id);
  }
}
