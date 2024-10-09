import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class NewAnswerInput {
  @Field(() => Int)
  option_id: number;

  @Field(() => Int)
  question_id: number;
}
