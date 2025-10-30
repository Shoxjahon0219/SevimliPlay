import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ContentsService } from "./contents.service";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";

@Controller("contents")
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  create(@Body() dto: CreateContentDto) {
    return this.contentsService.create(dto);
  }

  @Get()
  findAll() {
    return this.contentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.contentsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateContentDto) {
    return this.contentsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.contentsService.remove(id);
  }
}
