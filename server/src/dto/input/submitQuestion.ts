import { InputType, Field } from '@nestjs/graphql';
import { SubmitOptionInput } from './submitOption';

@InputType()
export class SubmitQuestionInput {
  @Field()
  questionText: string;

  @Field()
  hasMultipleOptions: boolean;

  @Field()
  allowsOther: boolean;

  @Field(() => [SubmitOptionInput])
  options: SubmitOptionInput[];
}
