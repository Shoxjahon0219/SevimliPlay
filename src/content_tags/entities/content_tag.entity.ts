import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Content } from "../../contents/entities/content.entity";
import { Tag } from "../../tags/entities/tag.entity";

@Entity("content_tags")
export class ContentTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.content_tags, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "content_id" })
  content: Content;

  @ManyToOne(() => Tag, (tag) => tag.content_tags, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tag_id" })
  tag: Tag;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;
}
