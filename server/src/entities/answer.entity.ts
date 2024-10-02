import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Question } from './question.entity';
import { Option } from './option.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  readonly answer_id: number;

  @Column('bigint', { nullable: false })
  option_id: string;

  @Column('bigint', { nullable: false })
  question_id: string;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ManyToOne(() => Option, (option) => option.answers)
  option: Option;
}
