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
import { ObjectType, Field } from '@nestjs/graphql';

@Entity({ name: 'answers' })
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn()
  @Field()
  readonly id: number;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  @Field(() => Question)
  question: Question;

  @ManyToOne(() => Option, (option) => option.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'option_id' })
  @Field(() => Option)
  option: Option;
}
