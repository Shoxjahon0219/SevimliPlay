import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}

  async create(dto: CreateAdminDto) {
    const verify = await this.adminRepo.findOneBy({ email: dto.email });
    if (verify) {
      throw new ConflictException("Bunday email mavjud");
    }
    dto.password = await bcrypt.hash(dto.password, 7);
    const newAdmin = await this.adminRepo.save(dto);
    return newAdmin;
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(id: number) {
    return this.adminRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException("Bunday admin yoq");
    }
    if (admin.email != dto.email) {
      const verify = await this.adminRepo.findOneBy({ email: dto.email });
      if (verify) {
        throw new ConflictException("Bunday email mavjud");
      }
    }
    const veerfyPass = await bcrypt.compare(dto.password!, admin.password);
    if (!veerfyPass) {
      dto.password = await bcrypt.hash(dto.password!, 7);
    }
    const newA = await this.adminRepo.preload({ id, ...dto });
    return this.adminRepo.save(newA!);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException("Bunday admin yoq");
    }
    await this.adminRepo.delete(id);
    return id;
  }
}
