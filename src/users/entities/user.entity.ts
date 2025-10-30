import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  Unique,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Subscription } from "../../subscriptions/entities/subscription.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { Profile } from "../../profiles/entities/profile.entity";

@Entity({ name: "users" })
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  @Exclude()
  password: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phone: string | null;

  @Column({ type: "boolean", nullable: true, default: false })
  is_email_verified: boolean | null;

  @Column({ type: "varchar" })
  refresh_token: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[];
}
