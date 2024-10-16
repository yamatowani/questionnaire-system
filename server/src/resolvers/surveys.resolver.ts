import { Query, Resolver, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { SurveyService } from 'src/services/surveys.service';
import { SubmitQuestionInput } from 'src/dto/input/submitQuestion';
import { Question } from 'src/entities/question.entity';
import { QuestionWithAnswerCounts } from 'src/dto/output/questionWithAnswerCounts.dto';
import { SubmitQuestionOutput } from 'src/dto/output/submitQuestion';

@Resolver(() => Question)
export class SurveyResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => Question)
  public async questionByUrl(@Args('url') url: string): Promise<Question> {
    return this.questionService.getQuestionByUrl(url);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Question])
  public async questions(@Context('req') req): Promise<Question[]> {
    const adminUserId = req.adminUserId;
    return this.questionService.getAllQuestionsByAdminUserId(adminUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [QuestionWithAnswerCounts])
  async questionResults(
    @Context('req') req,
  ): Promise<QuestionWithAnswerCounts[]> {
    const adminUserId = req.adminUserId;
    return this.questionService.getQuestionWithAnswerCounts(adminUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SubmitQuestionOutput)
  public async submitQuestion(
    @Args('submitQuestionInput') submitQuestionInput: SubmitQuestionInput,
    @Context('req') req,
  ): Promise<SubmitQuestionOutput> {
    try {
      const adminUserId = req.adminUserId;
      const question = await this.questionService.create(
        submitQuestionInput,
        adminUserId,
      );

      return {
        success: true,
        question: question,
      };
    } catch (error) {
      return {
        success: false,
        errorMessage: error.message || 'Internal Server error',
      };
    }
  }
}
