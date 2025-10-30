import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Subscription } from "../../subscriptions/entities/subscription.entity";
import { Currency, PaymentStatus } from "../../app.constants";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Subscription, (subscription) => subscription.payments, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "subscription_id" })
  subscription: Subscription;

  @Column({ type: "varchar", length: 100, nullable: true })
  provider: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  transaction_id: string;

  @Column({ type: "int", nullable: false })
  amount: number;

  @Column({
    type: "enum",
    enum: Currency,
    default: Currency.USD,
  })
  currency: Currency;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @CreateDateColumn({ type: "timestamp with time zone", nullable: true })
  paid_at: Date;

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;
}
