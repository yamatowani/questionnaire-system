import { Query, Resolver, Mutation, Args } from "@nestjs/graphql";
import { AnswerService } from "src/services/answers.service";
import { NewAnswerInput } from "src/dto/new-answer.input";
import { Answer } from "src/entities/answer.entity";

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Query(() => [Answer])
  public async getAnswerByQuestion(
    @Args('question_id') question_id: number,
  ): Promise<Answer[]> {
    return this.answerService.getAnswerByQuestion(question_id);
  }
}
