import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AdminUsersService } from '../services/admin_users.service';
import { AdminUser } from 'src/entities/admin_user.entity';
import { NewAdminUserInput } from 'src/dto/input/new-admin_user.input';

@Resolver(() => AdminUser)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Mutation(() => AdminUser)
  public async registerAdminUser(
    @Args('newAdminUserData') newAdminUserData: NewAdminUserInput,
  ): Promise<AdminUser> {
    return this.adminUsersService
      .createNewAdminUser(newAdminUserData)
      .catch((err) => {
        throw err;
      });
  }
}
