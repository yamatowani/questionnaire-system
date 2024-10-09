import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from 'src/services/questions.service';
import { NewQuestionInput } from 'src/dto/input/new-question.input';
import { Question } from 'src/entities/question.entity';
import { QuestionWithAnswerCounts } from 'src/dto/output/questionWithAnswerCounts.dto';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => Question)
  public async questionByUrl(@Args('url') url: string): Promise<Question> {
    return this.questionService.getQuestionByUrl(url);
  }

  @Query(() => [Question])
  public async questions(
    @Args('adminUserId', { type: () => Int }) adminUserId: number,
  ): Promise<Question[]> {
    return this.questionService.getAllQuestionsByAdminUserId(adminUserId);
  }

  @Query(() => [QuestionWithAnswerCounts])
  async questionResults(
    @Args('adminUserId', { type: () => Int }) adminUserId: number,
  ): Promise<any[]> {
    return this.questionService.getQuestionWithAnswerCounts(adminUserId);
  }

  @Mutation(() => Question)
  public async submitQuestion(
    @Args('newQuestionInput') newQuestionInput: NewQuestionInput,
    @Args('adminUserId', { type: () => Int }) adminUserId: number,
  ): Promise<Question> {
    return this.questionService.create(newQuestionInput, adminUserId);
  }
}
