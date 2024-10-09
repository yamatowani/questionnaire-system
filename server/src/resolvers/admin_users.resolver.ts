import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AdminUsersService } from '../services/admin_users.service';
import { RegisterAdminUserInput } from 'src/dto/input/registerAdminUser';
import { RegisterAdminUserOutput } from 'src/dto/output/registerAdminUser';

@Resolver(() => RegisterAdminUserOutput)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Mutation(() => RegisterAdminUserOutput)
  public async registerAdminUser(
    @Args('registerAdminUserInput')
    registerAdminUserInput: RegisterAdminUserInput,
  ): Promise<RegisterAdminUserOutput> {
    try {
      const user = await this.adminUsersService.createNewAdminUser(
        registerAdminUserInput,
      );

      return {
        success: true,
        statusCode: 201,
        user: user,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: error.statusCode || 500,
        errorMessage: error.message || 'Internal Server Error',
      };
    }
  }
}
