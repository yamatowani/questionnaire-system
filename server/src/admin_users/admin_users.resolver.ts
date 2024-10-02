import { Query, Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './admin_users.service';
import { AdminUser } from 'src/entities/admin_user.entity';

@Resolver(() => AdminUser)
export class AdminUsersResolver {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Query(() => [AdminUser])
  public async admin_users(): Promise<AdminUser[]> {
    return this.adminUsersService.getAllAdminUsers();
  }
}
