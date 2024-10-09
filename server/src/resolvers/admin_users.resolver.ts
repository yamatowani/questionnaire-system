import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AdminUsersService } from '../services/admin_users.service';
import { AdminUser } from 'src/entities/admin_user.entity';
import { RegisterAdminUserInput } from 'src/dto/input/registerAdminUser';

@Resolver(() => AdminUser)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Mutation(() => AdminUser)
  public async registerAdminUser(
    @Args('registerAdminUserInput')
    registerAdminUserInput: RegisterAdminUserInput,
  ): Promise<AdminUser> {
    return this.adminUsersService
      .createNewAdminUser(registerAdminUserInput)
      .catch((error) => {
        throw error;
      });
  }
}
