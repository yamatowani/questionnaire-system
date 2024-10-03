import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { QuestionService } from "src/services/questions.service";
import { NewQuestionInput } from "src/dto/new-question.input";
import { Question } from "src/entities/question.entity";

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  async createQuestion(
    @Args('createQuestionInput') newQuestionInput: NewQuestionInput
  ): Promise<Question> {
    return this.questionService.create(newQuestionInput)
  }
}