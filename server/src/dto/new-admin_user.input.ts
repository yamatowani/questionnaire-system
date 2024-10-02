import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class NewAdminUserInput {
  @Field()
  name: string;

  @Field()
  password_digest: string;

  @Field()
  session_id: string;
}
