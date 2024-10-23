import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SubmitOptionInput {
  @Field()
  optionText: string;
}
