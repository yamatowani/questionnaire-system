import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { AnswerService } from 'src/services/answers.service';
import { NewAnswerInput } from 'src/dto/new-answer.input';
import { Answer } from 'src/entities/answer.entity';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Query(() => [Answer])
  public async getAnswerByAdminUser(
    @Args('adminUserId') adminUserId: number,
  ): Promise<Answer[]> {
    return this.answerService.getAnswerByAdminUser(adminUserId);
  }

  @Mutation(() => Answer)
  async createAnswer(
    @Args('newAnswerInput') newAnswerInput: NewAnswerInput,
  ): Promise<Answer> {
    return this.answerService.create(newAnswerInput);
  }
}
