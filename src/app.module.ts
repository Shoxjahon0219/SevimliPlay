import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminsModule } from "./admins/admins.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PlansModule } from "./plans/plans.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";
import { PaymentsModule } from "./payments/payments.module";
import { DevicesModule } from "./devices/devices.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { ContentsModule } from "./contents/contents.module";
import { TagsModule } from "./tags/tags.module";
import { ContentTagsModule } from "./content_tags/content_tags.module";
import { CategoriesModule } from "./categories/categories.module";
import { ContentCategoriesModule } from "./content_categories/content_categories.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),

    UsersModule,

    AdminsModule,

    AuthModule,

    PlansModule,

    SubscriptionsModule,

    PaymentsModule,

    DevicesModule,

    ProfilesModule,

    ContentsModule,

    TagsModule,

    ContentTagsModule,

    CategoriesModule,

    ContentCategoriesModule,
  ],
})
export class AppModule {}
