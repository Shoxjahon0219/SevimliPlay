import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";import { UserService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
;

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME as any},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
