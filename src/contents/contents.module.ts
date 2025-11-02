import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "./entities/content.entity";
import { ContentsService } from "./contents.service";
import { ContentsController } from "./contents.controller";
import { Rating } from "../ratings/entities/rating.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Content, Rating])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
