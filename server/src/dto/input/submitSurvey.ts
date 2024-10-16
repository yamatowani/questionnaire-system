import { InputType, Field } from '@nestjs/graphql';
import { SubmitQuestionInput } from './submitQuestion';

@InputType()
export class SubmitSurveyInput {
  @Field()
  question_text: string;

  @Field()
  has_multiple_options: boolean;

  @Field()
  allows_other: boolean;

  @Field(() => [SubmitQuestionInput])
  questions: SubmitQuestionInput[];
}
