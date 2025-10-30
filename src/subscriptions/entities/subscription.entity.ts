import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { SubscriptionStatus } from "../../app.constants";
import { User } from "../../users/entities/user.entity";
import { Plan } from "../../plans/entities/plan.entity";
import { Payment } from "../../payments/entities/payment.entity";

@Entity("subscriptions")
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "plan_id" })
  plan: Plan;

  @Column({
    type: "enum",
    enum: SubscriptionStatus,
    default: SubscriptionStatus.PENDING,
  })
  status: SubscriptionStatus;

  @Column({ type: "timestamp with time zone", nullable: true })
  start_date: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  end_date: Date;

  @Column({ type: "boolean", default: true })
  auto_renew: boolean;

  @CreateDateColumn({ type: "timestamp with time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated_at: Date;

  @OneToMany(() => Payment, (payment) => payment.subscription)
  payments: Payment[];
}
