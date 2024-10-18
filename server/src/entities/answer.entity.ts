import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OptionAnswer } from './optionAnswer.entity';

@Entity({ name: 'answers' })
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  readonly id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  other_response: string;

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

  @OneToMany(() => OptionAnswer, (optionAnswer) => optionAnswer.answer)
  @Field(() => [OptionAnswer])
  optionAnswers: OptionAnswer[];
}
