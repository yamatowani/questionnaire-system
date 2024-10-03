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
import { AdminUser } from './admin_user.entity';
import { Option } from './option.entity';
import { Answer } from './answer.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity({ name: 'questions' })
@ObjectType()
export class Question {
  @PrimaryGeneratedColumn()
  readonly question_id: number;

  @Column('varchar', { nullable: true })
  @Field()
  title: string;

  @Column('varchar', { nullable: false })
  @Field()
  url: string;

  @ManyToOne(() => AdminUser, (admin_user) => admin_user.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'admin_user_id' })
  @Field(() => AdminUser)
  admin_user: AdminUser;

  @OneToMany(() => Option, (option) => option.question, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Option])
  options: Option[];

  @OneToMany(() => Answer, (answer) => answer.question, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Answer])
  answers: Answer[];

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}
