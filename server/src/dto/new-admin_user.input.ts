import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewAdminUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
