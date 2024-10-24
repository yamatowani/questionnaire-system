import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SurveyResult {
  @Field(() => Int)
  surveyId: number;

  @Field()
  title: string;

  @Field()
  answer_count: number;

  @Field(() => [QuestionResults])
  questionResults: QuestionResults[];
}

@ObjectType()
export class QuestionResults {
  @Field(() => Int)
  questionId: number;

  @Field()
  questionText: string;

  @Field(() => [AnswerCounts])
  answerCounts: AnswerCounts[];

  @Field(() => Int, { nullable: true })
  otherCount?: number;

  @Field(() => [String], { nullable: true })
  otherResponses?: string[];
}

@ObjectType()
export class AnswerCounts {
  @Field(() => Int)
  optionId: number;

  @Field()
  optionText: string;

  @Field(() => Int)
  count: number;
}
