import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SubmitAnswerInput {
  @Field(() => [SubmitQuestionAnswerInput])
  question_answers: SubmitQuestionAnswerInput[];
}

@InputType()
export class SubmitQuestionAnswerInput {
  @Field(() => Int)
  questionId: number;

  @Field(() => [SubmitOptionAnswerInput])
  options: SubmitOptionAnswerInput[];
}

@InputType()
export class SubmitOptionAnswerInput {
  @Field(() => Int)
  optionId: number;

  @Field({ nullable: true })
  otherResponse?: string;
}
