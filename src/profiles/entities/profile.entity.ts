import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Language, MaturityLevel } from "../../app.constants";
import { BlobOptions } from "buffer";
import { Device } from "../../devices/entities/device.entity";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.profiles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar", length: 50 })
  display_name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  avatar_url: string;

  @Column({ type: "enum", enum: Language, default: Language.UZ })
  language: Language;

  @Column({
    type: "enum",
    enum: MaturityLevel,
    default: MaturityLevel.SIXTEEN_PLUS,
  })
  maturity_level: MaturityLevel;

  @Column({ type: "boolean", default: false })
  is_default: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;

  @OneToMany(() => Device, (device) => device.profile)
  devices: Device[];
}
