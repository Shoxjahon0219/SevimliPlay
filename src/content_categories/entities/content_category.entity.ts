import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Content } from "../../contents/entities/content.entity";
import { Category } from "../../categories/entities/category.entity";

@Entity("content_categories")
export class ContentCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.content_categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "content_id" })
  content: Content;

  @ManyToOne(() => Category, (category) => category.content_categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;
}
