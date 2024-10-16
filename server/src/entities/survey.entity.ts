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
import { Question } from './question.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity({ name: 'surveys' })
@ObjectType()
export class Survey {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @Column('varchar')
  @Field()
  title: string;

  @Column('varchar', { unique: true, nullable: false })
  @Field()
  url: string;

  @ManyToOne(() => AdminUser, (admin_user) => admin_user.surveys, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'admin_user_id' })
  @Field(() => AdminUser)
  admin_user: AdminUser;

  @OneToMany(() => Question, (question) => question.survey, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Question])
  questions: Question[];

  @CreateDateColumn()
  @Field()
  readonly created_at?: Date;

  @UpdateDateColumn()
  @Field()
  readonly updated_at?: Date;
}
