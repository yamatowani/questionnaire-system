import { Field, ObjectType } from '@nestjs/graphql';
import { Answer } from 'src/entities/answer.entity';

@ObjectType()
export class SubmitAnswerOutput {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  errorMessage?: string;

  @Field(() => Answer, { nullable: true })
  answer?: Answer[];
}
