import { InputType, Field } from '@nestjs/graphql';
import { NewOptionInput } from './new-option.input';


@InputType()
export class NewQuestionInput {
  @Field()
  title: string;

  @Field()
  url: string;

  @Field(() => [NewOptionInput])
  options: NewOptionInput[];
}
