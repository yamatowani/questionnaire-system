import { Query, Resolver, Mutation, Args } from "@nestjs/graphql";
import { QuestionService } from "src/services/questions.service";
import { NewQuestionInput } from "src/dto/new-question.input";
import { Question } from "src/entities/question.entity";

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => Question)
  public async getQuestionByUrl(
    @Args('url') url: string
  ): Promise<Question> {
    return this.questionService.getQuestionByUrl(url);
  }

  @Query(() => [Question])
  public async questions(): Promise<Question[]> {
    return this.questionService.getAllQuestions();
  }

  @Mutation(() => Question)
  async createQuestion(
    @Args('createQuestionInput') newQuestionInput: NewQuestionInput
  ): Promise<Question> {
    return this.questionService.create(newQuestionInput);
  }
}
