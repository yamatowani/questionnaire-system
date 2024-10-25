import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Survey } from './survey.entity';
import { Answer } from './answer.entity';

@Entity({ name: 'survey_answers' })
@ObjectType()
export class SurveyAnswer {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @ManyToOne(() => Survey, (survey) => survey.survey_answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'survey_id' })
  @Field(() => Survey)
  survey: Survey;

  @OneToMany(() => Answer, (answer) => answer.survey_answer, {
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
