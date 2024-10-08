import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AnswerCount {
  @Field(() => Int)
  option_id: number;

  @Field()
  option_text: string;

  @Field(() => Int)
  count: number;
}
