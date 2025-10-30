import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { BillingPeriod, Currency, VideoQuality } from "../../app.constants";
import { Subscription } from "../../subscriptions/entities/subscription.entity";

@Entity("plans")
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ type: "enum", enum: Currency, default: Currency.UZS })
  currency: Currency;

  @Column({ type: "enum", enum: BillingPeriod, default: BillingPeriod.MONTHLY })
  billing_period: BillingPeriod;

  @Column({ type: "enum", enum: VideoQuality, default: VideoQuality.HD })
  video_quality: VideoQuality;

  @Column({ default: 1 })
  max_profiles: number;

  @Column({ default: 1 })
  concurrent_streams: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
