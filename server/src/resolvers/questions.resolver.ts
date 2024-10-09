import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from 'src/services/questions.service';
import { SubmitQuestionInput } from 'src/dto/input/submitQuestion';
import { Question } from 'src/entities/question.entity';
import { QuestionWithAnswerCounts } from 'src/dto/output/questionWithAnswerCounts.dto';
import { SubmitQUestionOutput } from 'src/dto/output/submitQuestion';

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
  ): Promise<QuestionWithAnswerCounts[]> {
    return this.questionService.getQuestionWithAnswerCounts(adminUserId);
  }

  @Mutation(() => SubmitQUestionOutput)
  public async submitQuestion(
    @Args('submitQuestionInput') submitQuestionInput: SubmitQuestionInput,
    @Args('adminUserId', { type: () => Int }) adminUserId: number,
  ): Promise<SubmitQUestionOutput> {
    try {
      const question = await this.questionService.create(
        submitQuestionInput,
        adminUserId,
      );

      return {
        success: true,
        statusCode: 201,
        question: question,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.statusCode || 500,
        errorMessage: error.message || 'Internal Server error',
      };
    }
  }
}
