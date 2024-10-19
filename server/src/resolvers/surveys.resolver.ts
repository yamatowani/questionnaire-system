import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { SurveyService } from 'src/services/surveys.service';
import { SubmitSurveyInput } from 'src/dto/input/submitSurvey';
import { Survey } from 'src/entities/survey.entity';
import { SurveyResult } from 'src/dto/output/surveyResult';
import { SubmitSurveyOutput } from 'src/dto/output/submitSurvey';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => Survey)
  public async surveyByUrl(@Args('url') url: string): Promise<Survey> {
    return this.surveyService.surveyByUrl(url);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Survey])
  public async surveys(@Context('req') req): Promise<Survey[]> {
    const adminUserId = req.adminUserId;
    return this.surveyService.surveys(adminUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => SurveyResult)
  async surveyResult(@Args('url') url: string): Promise<SurveyResult> {
    return this.surveyService.surveyResult(url);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => SubmitSurveyOutput)
  public async submitSurvey(
    @Args('submitSurveyInput') submitSurveyInput: SubmitSurveyInput,
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
