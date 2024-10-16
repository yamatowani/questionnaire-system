import { InputType, Field } from '@nestjs/graphql';
import { SubmitOptionInput } from './submitOption';

@InputType()
export class SubmitQuestionInput {
  @Field()
  question_text: string;

  @Field()
  has_multiple_options: boolean;

  @Field()
  allows_other: boolean;

  @Field(() => [SubmitOptionInput])
  options: SubmitOptionInput[];
}
