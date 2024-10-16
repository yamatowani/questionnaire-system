import { Field, ObjectType } from '@nestjs/graphql';
import { Survey } from 'src/entities/survey.entity';

@ObjectType()
export class SubmitSurvetOutput {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  errorMessage?: string;

  @Field(() => Survey, { nullable: true })
  survey?: Survey;
}
