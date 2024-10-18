import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SubmitAnswerInput {
  @Field(() => [SubmitQuestionAnswerInput])
  question_answers: SubmitQuestionAnswerInput[];
}

@InputType()
export class SubmitQuestionAnswerInput {
  @Field(() => Int)
  question_id: number;

  @Field(() => [SubmitOptionAnswerInput])
  options: SubmitOptionAnswerInput[];
}

@InputType()
export class SubmitOptionAnswerInput {
  @Field(() => Int)
  option_id: number;

  @Field({ nullable: true })
  other_response?: string;
}
