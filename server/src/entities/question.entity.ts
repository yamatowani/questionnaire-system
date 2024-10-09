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
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity({ name: 'questions' })
@ObjectType()
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @Column('varchar')
  @Field()
  title: string;

  @Column('varchar', { unique: true, nullable: false })
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
  @Field(() => [Answer], { nullable: true })
  answers: Answer[];

  @CreateDateColumn()
  @Field()
  readonly created_at?: Date;

  @UpdateDateColumn()
  @Field()
  readonly updated_at?: Date;
}
