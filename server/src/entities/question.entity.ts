import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Option } from './option.entity';
import { Answer } from './answer.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Survey } from './survey.entity';

@Entity({ name: 'questions' })
@ObjectType()
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @Column('varchar')
  @Field()
  question_text: string;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'survey_id' })
  @Field(() => Survey)
  survey: Survey;

  @OneToMany(() => Option, (option) => option.question, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Option])
  options: Option[];

  @OneToMany(() => Answer, (answer) => answer.question, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Answer], { nullable: true })
  answers: Answer[];

  @CreateDateColumn()
  @Field()
  readonly created_at?: Date;

  @UpdateDateColumn()
  @Field()
  readonly updated_at?: Date;
}
