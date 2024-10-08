import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AnswerCount } from './answerCount.dto';

@ObjectType()
export class QuestionWithAnswerCounts {
  @Field(() => Int)
  questionId: number;

  @Field()
  title: string;

  @Field(() => [AnswerCount])
  options: AnswerCount[];
}
