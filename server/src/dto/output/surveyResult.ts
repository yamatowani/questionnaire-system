import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SurveyResult {
  @Field(() => Int)
  surveyId: number;

  @Field()
  title: string;

  @Field(() => [Questions])
  questions: Questions[];
}

@ObjectType()
class Questions {
  @Field(() => Int)
  questionId: number;

  @Field()
  questionText: string;

  @Field(() => [AnswerCounts])
  questionResults: AnswerCounts[];
}

@ObjectType()
class AnswerCounts {
  @Field(() => Int)
  option_id: number;

  @Field()
  optionText: string;

  @Field(() => Int)
  count: number;
}
