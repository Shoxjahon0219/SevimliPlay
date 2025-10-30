import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ProfilesService } from "./profiles.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller("profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() dto: CreateProfileDto) {
    return this.profilesService.create(dto);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.profilesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateProfileDto) {
    return this.profilesService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.profilesService.remove(id);
  }
}
