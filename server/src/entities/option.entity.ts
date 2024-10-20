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
import { Question } from './question.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Answer } from './answer.entity';

@Entity({ name: 'options' })
@ObjectType()
export class Option {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @Column('varchar')
  @Field()
  option_text: string;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  @Field(() => Question)
  question: Question;

  @OneToMany(() => Answer, (answer) => answer.option)
  @Field(() => [Answer])
  answers: Answer[];

  @CreateDateColumn()
  @Field()
  readonly created_at?: Date;

  @UpdateDateColumn()
  @Field()
  readonly updated_at?: Date;
}
