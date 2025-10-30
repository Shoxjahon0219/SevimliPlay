import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Profile } from "../../profiles/entities/profile.entity";

export enum DeviceType {
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  TV = "TV",
  PC = "PC",
  OTHER = "OTHER",
}

@Entity("devices")
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.devices, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  profile: Profile;

  @Column({ type: "varchar", length: 100 })
  device_name: string;

  @Column({
    type: "enum",
    enum: DeviceType,
    default: DeviceType.OTHER,
  })
  device_type: DeviceType;

  @Column({ type: "varchar", length: 200, nullable: true })
  ip_address?: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  user_agent?: string;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}
