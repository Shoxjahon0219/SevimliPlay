import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import type { Response } from "express";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "../auth/dto/login.dto";
import { CookieGetter } from "../common/decorator/cookie-getter.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logout(refreshToken, res);
  }

  @Post(":id/refresh")
  @HttpCode(HttpStatus.OK)
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
