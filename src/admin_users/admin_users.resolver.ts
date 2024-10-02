import { Query, Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './admin_users.service';

@Resolver()
export class AdminUsersResolver {
  constructor(private adminUsersService: AdminUsersService) {}

  @Query(() => String)
  public async admin_users() {
    return 'All Admin Users';
  }
}
