import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Option } from './option.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Answer } from './answer.entity';

@Entity({ name: 'option_answers' })
@ObjectType()
export class OptionnAnswer {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  readonly id: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'answer_id' })
  @Field(() => Answer)
  answer: Answer;

  @ManyToOne(() => Option, (option) => option.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'option_id' })
  @Field(() => Option)
  option: Option;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}
