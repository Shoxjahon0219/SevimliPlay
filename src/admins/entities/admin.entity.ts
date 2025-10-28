import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  Unique,
} from "typeorm";
import { Exclude } from "class-transformer";

@Entity({ name: "admins" })
@Unique(["email"])
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  @Exclude()
  password: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  full_name: string | null;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    default: null,
  })
  role: "superadmin" | "moderator" | null;

  @Column({ type: "boolean", default: false })
  is_creator: boolean;

  @Column({ type: "varchar" })
  refresh_token: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date;
}
