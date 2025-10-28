import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, confirm_password, phone, is_email_verified } =
      createUserDto as any;

    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) throw new BadRequestException("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 7);

    const user = this.userRepo.create({
      email,
      password: hashedPassword,
      phone: phone ?? null,
      is_email_verified: is_email_verified ?? false,
    });

    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find({
      select: [
        "id",
        "email",
        "phone",
        "is_email_verified",
        "created_at",
        "updated_at",
      ],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    delete (user as any).password;
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 7);
    }
    if (dto.email && dto.email !== user.email) {
      const exists = await this.userRepo.findOne({
        where: { email: dto.email },
      });
      if (exists) throw new BadRequestException("Email already in use");
      user.email = dto.email;
    }

    if (dto.phone !== undefined) user.phone = dto.phone;
    if (dto.is_email_verified !== undefined)
      user.is_email_verified = dto.is_email_verified;

    await this.userRepo.save(user);
    delete (user as any).password;
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    await this.userRepo.delete(id);
    return { deleted: true };
  }
}
