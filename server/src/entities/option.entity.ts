import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity({ name: 'options' })
@ObjectType()
export class Option {
  @PrimaryGeneratedColumn()
  readonly option_id: number;

  @Column('varchar', { nullable: true })
  @Field()
  option_text: string;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  @Field(() => Question)
  question: Question;

  @OneToMany(() => Answer, (answer) => answer.option)
  @Field(() => [Answer])
  answers: Answer[];
}
