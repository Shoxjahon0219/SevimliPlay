import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Profile } from "../../profiles/entities/profile.entity";
import { Content } from "../../contents/entities/content.entity";

@Entity("ratings")
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.ratings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "content_id" })
  content: Content;

  @ManyToOne(() => Profile, (profile) => profile.ratings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "profile_id" })
  profile: Profile;

  @Column({ type: "enum", enum: ["1", "2", "3", "4", "5"], default: "1" })
  rating: string;

  @Column({ type: "varchar", length: 500, nullable: false })
  review: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;
  
}
