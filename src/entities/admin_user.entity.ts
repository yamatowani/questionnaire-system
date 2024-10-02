// src/entities/admin_user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity({ name: 'admin_users' })
@ObjectType()
export class AdminUser {
  @PrimaryGeneratedColumn()
  @Field()
  readonly admin_user_id: number;

  @Column('varchar', { length: 20, nullable: true })
  @Field()
  name: string;

  @Column('varchar', { nullable: true })
  @Field()
  password_digest: string;

  @Column('varchar', { nullable: false })
  @Field()
  session_id: string;

  @CreateDateColumn()
  @Field()
  readonly created_at?: Date;

  @UpdateDateColumn()
  @Field()
  readonly updated_at?: Date;

  // @OneToMany(() => Question, (question) => question.admin_user)
  // questions: Question[];
}
