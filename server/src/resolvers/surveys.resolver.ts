import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { SurveyService } from 'src/services/surveys.service';
import { SubmitSurveyInput } from 'src/dto/input/submitSurvey';
import { Survey } from 'src/entities/survey.entity';
import { Question } from 'src/entities/question.entity';
// import { QuestionWithAnswerCounts } from 'src/dto/output/questionWithAnswerCounts.dto';
import { SubmitSurveyOutput } from 'src/dto/output/submitSurvey';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => Question)
  public async surveyByUrl(@Args('url') url: string): Promise<Survey> {
    return this.surveyService.surveyByUrl(url);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Survey])
  public async surveys(@Context('req') req): Promise<Survey[]> {
    const adminUserId = req.adminUserId;
    return this.surveyService.surveys(adminUserId);
  }

  // あとでやる
  // @UseGuards(JwtAuthGuard)
  // @Query(() => [QuestionWithAnswerCounts])
  // async questionResults(
  //   @Context('req') req,
  // ): Promise<QuestionWithAnswerCounts[]> {
  //   const adminUserId = req.adminUserId;
  //   return this.questionService.getQuestionWithAnswerCounts(adminUserId);
  // }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SubmitSurveyOutput)
  public async submitQuestion(
    @Args('submitSurvetInput') submitSurveyInput: SubmitSurveyInput,
    @Context('req') req,
  ): Promise<SubmitSurveyOutput> {
    try {
      const adminUserId = req.adminUserId;
      const survey = await this.surveyService.create(
        submitSurveyInput,
        adminUserId,
      );

      return {
        success: true,
        survey: survey,
      };
    } catch (error) {
      return {
        success: false,
        errorMessage: error.message || 'Internal Server error',
      };
    }
  }
}
