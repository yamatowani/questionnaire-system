import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewOptionInput {
  @Field()
  option_text: string;
}

