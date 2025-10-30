import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContentType } from "../../app.constants";

@Entity("contents")
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "enum",
    enum: ContentType,
    default: ContentType.MOVIE,
  })
  type: ContentType;

  @Column({ type: "varchar", length: 500, nullable: true })
  thumbnail_url?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  content_url?: string;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;
}
