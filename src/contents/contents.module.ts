import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "./entities/content.entity";
import { ContentsService } from "./contents.service";
import { ContentsController } from "./contents.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
