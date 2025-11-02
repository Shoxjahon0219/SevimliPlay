import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentCategory } from "./entities/content_category.entity";
import { ContentCategoriesService } from "./content_categories.service";
import { ContentCategoriesController } from "./content_categories.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ContentCategory])],
  controllers: [ContentCategoriesController],
  providers: [ContentCategoriesService],
  exports: [ContentCategoriesService],
})
export class ContentCategoriesModule {}
