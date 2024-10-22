import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AnswerService } from 'src/services/answers.service';
import { SubmitAnswerInput } from 'src/dto/input/submitAnswer';
import { SubmitAnswerOutput } from 'src/dto/output/submitAnswer';
import { Answer } from 'src/entities/answer.entity';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => SubmitAnswerOutput)
  async submitAnswer(
    @Args('submitAnswerInput') submitAnswerInput: SubmitAnswerInput,
  ) {
    try {
      const answer = await this.answerService.create(submitAnswerInput);

      return {
        success: true,
        answer: answer,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      return {
        success: false,
        errorMessage: error.message || 'Internal Server error',
      };
    }
  }
}
