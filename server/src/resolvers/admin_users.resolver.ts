import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { AdminUsersService } from '../services/admin_users.service';
import { AdminUser } from 'src/entities/admin_user.entity';
import { NewAdminUserInput } from 'src/dto/new-admin_user.input';
import { CreateDateColumn } from 'typeorm';

@Resolver(() => AdminUser)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Query(() => [AdminUser])
  public async admin_users(): Promise<AdminUser[]> {
    return this.adminUsersService.getAllAdminUsers();
  }

  @Mutation(() => AdminUser)
  public async addNewAdminUser(
    @Args('newAdminUserData') newAdminUserData: NewAdminUserInput,
  ): Promise<AdminUser> {
    return await this.adminUsersService.createNewAdminUser(newAdminUserData).catch((err) => {
      throw err;
    })
  }
}



