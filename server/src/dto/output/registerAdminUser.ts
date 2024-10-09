import { Field, ObjectType } from '@nestjs/graphql';
import { AdminUser } from 'src/entities/admin_user.entity';

@ObjectType()
export class RegisterAdminUserOutput {
  @Field()
  success: boolean;

  @Field()
  statusCode: number;

  @Field({ nullable: true })
  errorMessage?: string;

  @Field(() => AdminUser, { nullable: true })
  user?: AdminUser;
}
