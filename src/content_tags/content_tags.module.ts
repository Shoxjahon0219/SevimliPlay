import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentTagsController } from "./content_tags.controller";
import { ContentTagsService } from "./content_tags.service";
import { ContentTag } from "./entities/content_tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ContentTag])],
  controllers: [ContentTagsController],
  providers: [ContentTagsService],
  exports: [ContentTagsService],
})
export class ContentTagsModule {}
