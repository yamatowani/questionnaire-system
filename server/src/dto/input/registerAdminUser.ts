import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterAdminUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
