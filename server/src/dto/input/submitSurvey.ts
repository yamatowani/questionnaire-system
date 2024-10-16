import { InputType, Field } from '@nestjs/graphql';
import { SubmitQuestionInput } from './submitQuestion';

@InputType()
export class SubmitSurveyInput {
  @Field()
  title: string;

  @Field(() => [SubmitQuestionInput])
  questions: SubmitQuestionInput[];
}
