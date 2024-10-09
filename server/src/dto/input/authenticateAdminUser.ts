import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthenticateAdminUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
