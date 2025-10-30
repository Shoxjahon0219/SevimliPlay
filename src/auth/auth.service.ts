import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import * as bcrypt from "bcrypt";

import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "../auth/dto/login.dto";
import { UserService } from "../users/users.service";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  private async generateTokens(user: User) {
    const payload = { id: user.id, email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME as any,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME as any,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email
    );
    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return { message: "User registered successfully", userId: user.id };
  }

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException("Invalid email or password");

    const passwordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!passwordValid)
      throw new UnauthorizedException("Invalid email or password");

    const { accessToken, refreshToken } = await this.generateTokens(user);

    const hashedRefresh = await bcrypt.hash(refreshToken, 7);
    await this.userService.update(user.id, { refresh_token: hashedRefresh });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Login successful",
      userId: user.id,
      access_token: accessToken,
    };
  }

  async logout(refreshToken: string, res: Response) {
    if (!refreshToken) throw new UnauthorizedException("Refresh token missing");

    const userData = this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const user = await this.userService.findOne(userData.id);
    if (!user) throw new UnauthorizedException("User not found");

    await this.userService.update(user.id, { refresh_token: "" });

    res.clearCookie("refreshToken");
    return { message: "User logged out successfully" };
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    if (!refresh_token) throw new ForbiddenException("Refresh token missing");

    const decoded = this.jwtService.decode(refresh_token);
    if (userId !== decoded["id"]) {
      throw new ForbiddenException("Invalid user for this token");
    }

    const user = await this.userService.findOne(userId);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException("User not authorized");
    }

    const valid = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!valid) throw new ForbiddenException("Invalid refresh token");

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const newHashedRefresh = await bcrypt.hash(refreshToken, 7);
    await this.userService.update(user.id, { refresh_token: newHashedRefresh });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Access token refreshed successfully",
      userId: user.id,
      access_token: accessToken,
    };
  }
}
