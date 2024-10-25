import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Question } from './question.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Option } from './option.entity';
import { SurveyAnswer } from './survey_answer.entity';

@Entity({ name: 'answers' })
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  readonly id: number;

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

  @ManyToOne(() => SurveyAnswer, (survey_answer) => survey_answer.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'survey_answer_id' })
  @Field(() => SurveyAnswer)
  survey_answer: SurveyAnswer;

  @Column({ nullable: true })
  @Field({ nullable: true })
  other_response: string;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}
