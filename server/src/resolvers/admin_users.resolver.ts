import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AdminUsersService } from '../services/admin_users.service';
import { AdminUser } from 'src/entities/admin_user.entity';
import { NewAdminUserInput } from 'src/dto/new-admin_user.input';
import { QuestionService } from 'src/services/questions.service';
import { NewQuestionInput } from 'src/dto/new-question.input';
import { Question } from 'src/entities/question.entity';

@Resolver(() => AdminUser)
export class AdminUsersResolver {
  constructor(
    private readonly adminUsersService: AdminUsersService,
    private readonly questionService: QuestionService,
  ) {}

  @Mutation(() => AdminUser)
  public async addNewAdminUser(
    @Args('newAdminUserData') newAdminUserData: NewAdminUserInput,
  ): Promise<AdminUser> {
    return this.adminUsersService
      .createNewAdminUser(newAdminUserData)
      .catch((err) => {
        throw err;
      });
  }

  @Mutation(() => Question)
  public async createQuestion(
    @Args('newQuestionInput') newQuestionInput: NewQuestionInput,
    @Args('adminUserId') adminUserId: number,
  ): Promise<Question> {
    return this.questionService
      .create(newQuestionInput, adminUserId)
      .catch((err) => {
        throw err;
      });
  }
}
