import { Field, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/entities/question.entity';

@ObjectType()
export class SubmitQuestionOutput {
  @Field()
  success: boolean;

  @Field()
  statusCode: number;

  @Field({ nullable: true })
  errorMessage?: string;

  @Field(() => Question, { nullable: true })
  question?: Question;
}
