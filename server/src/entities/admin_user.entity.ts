import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity({ name: 'admin_users' })
@ObjectType()
export class AdminUser {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @Column('varchar', { length: 20 })
  @Field()
  name: string;

  @Column('varchar', { unique: true, nullable: false })
  @Field()
  email: string;

  @Column('varchar')
  password_digest: string;

  @CreateDateColumn()
  @Field()
  readonly created_at?: Date;

  @UpdateDateColumn()
  @Field()
  readonly updated_at?: Date;

  @OneToMany(() => Question, (question) => question.admin_user, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Question])
  questions: Question[];
}
