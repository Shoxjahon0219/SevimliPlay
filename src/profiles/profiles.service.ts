import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "./entities/profile.entity";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>
  ) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepo.create({
      ...dto,
      user: { id: dto.user_id },
    });
    return await this.profileRepo.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileRepo.find({ relations: ["user"] });
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepo.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!profile) throw new NotFoundException("Profile not found");
    return profile;
  }

  async update(id: number, dto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.findOne(id);
    Object.assign(profile, dto);
    return await this.profileRepo.save(profile);
  }

  async remove(id: number) {
    const profile = await this.findOne(id);
    await this.profileRepo.remove(profile);
    return { message: "Profile deleted successfully" };
  }
}
