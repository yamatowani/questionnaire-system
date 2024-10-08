import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from 'src/services/questions.service';
import { NewQuestionInput } from 'src/dto/new-question.input';
import { Question } from 'src/entities/question.entity';
import { QuestionWithAnswerCounts } from 'src/dto/questionWithAnswerCounts.dto';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => Question)
  public async getQuestionByUrl(@Args('url') url: string): Promise<Question> {
    return this.questionService.getQuestionByUrl(url);
  }

  @Query(() => [Question])
  public async getAllQuestionsByAdminUserId(
    @Args('adminUserId', { type: () => Int }) adminUserId: number,
  ): Promise<Question[]> {
    return this.questionService.getAllQuestionsByAdminUserId(adminUserId);
  }

  @Query(() => [QuestionWithAnswerCounts])
  async getQuestionWithAnswerCounts(
    @Args('adminUserId', { type: () => Int }) adminUserId: number,
  ): Promise<any[]> {
    return this.questionService.getQuestionWithAnswerCounts(adminUserId);
  }

  @Mutation(() => Question)
  public async createQuestion(
    @Args('newQuestionInput') newQuestionInput: NewQuestionInput,
    @Args('adminUserId', { type: () => Int }) adminUserId: number,
  ): Promise<Question> {
    return this.questionService.create(newQuestionInput, adminUserId);
  }
}
