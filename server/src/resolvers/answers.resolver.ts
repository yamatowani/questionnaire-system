import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswerService } from 'src/services/answers.service';
import { NewAnswerInput } from 'src/dto/new-answer.input';
import { Answer } from 'src/entities/answer.entity';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => Answer)
  async createAnswer(
    @Args('newAnswerInput') newAnswerInput: NewAnswerInput,
  ): Promise<Answer> {
    return this.answerService.create(newAnswerInput);
  }
}
