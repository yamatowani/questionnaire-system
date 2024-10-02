import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class AdminUser {
  @Field()
  admin_user_id: number;

  @Field()
  name: string;

  @Field()
  password_digest: string;

  @Field()
  session_id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
