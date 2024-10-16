import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Survey } from './survey.entity';

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

  @OneToMany(() => Survey, (survey) => survey.admin_user, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Survey])
  surveys: Survey[];
}
