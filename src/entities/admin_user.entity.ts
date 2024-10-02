import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class AdminUser {
  @PrimaryGeneratedColumn()
  readonly admin_user_id: number;

  @Column('varchar', { length: 20, nullable: true })
  name: string;

  @Column('varchar', { nullable: true })
  password_digest: string;

  @Column('varchar', { nullable: false })
  session_id: string;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;

  @OneToMany(() => Question, (question) => question.admin_user)
  questions: Question[];
}
