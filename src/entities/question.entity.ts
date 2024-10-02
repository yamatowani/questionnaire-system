import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AdminUser } from './admin_user.entity';
import { Option } from './option.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  readonly question_id: number;

  @Column('varchar', { nullable: true })
  title: string;

  @Column('varchar', { nullable: false })
  url: string;

  @Column('bigint', { nullable: false })
  admin_user_id: string;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;

  // @ManyToOne(() => AdminUser, (admin_user) => admin_user.questions)
  // admin_user: AdminUser;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
