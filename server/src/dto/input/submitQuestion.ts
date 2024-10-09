import { InputType, Field } from '@nestjs/graphql';
import { SubmitOptionInput } from './submitOption';

@InputType()
export class SubmitQuestionInput {
  @Field()
  title: string;

  @Field(() => [SubmitOptionInput])
  options: SubmitOptionInput[];
}
