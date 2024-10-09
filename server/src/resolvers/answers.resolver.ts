import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AnswerService } from 'src/services/answers.service';
import { SubmitAnswerInput } from 'src/dto/input/submitAnswer';
import { Answer } from 'src/entities/answer.entity';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => Answer)
  async submitAnswer(
    @Args('submitAnswerInput') submitAnswerInput: SubmitAnswerInput,
  ): Promise<Answer> {
    return this.answerService.create(submitAnswerInput);
  }
}
