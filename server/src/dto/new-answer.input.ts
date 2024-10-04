import { InputType, Field } from "@nestjs/graphql";


@InputType()
export class NewAnswerInput {
  @Field()
  option_id: number;

  @Field()
  question_id: number;
}
