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
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn()
  readonly answer_id: number;

  @Column('bigint', { nullable: false })
  @Field()
  option_id: number;

  @Column('bigint', { nullable: false })
  @Field()
  question_id: number;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;

  @ManyToOne(() => Question, (question) => question.answers)
  @Field(() => Question)
  question: Question;

  @ManyToOne(() => Option, (option) => option.answers)
  @Field(() => Option)
  option: Option;
}
