import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  create(@Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.subscriptionsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateSubscriptionDto
  ) {
    return this.subscriptionsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.subscriptionsService.remove(id);
  }
}
