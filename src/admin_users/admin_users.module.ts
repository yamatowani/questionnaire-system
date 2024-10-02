import { Module } from '@nestjs/common';
import { AdminUsersResolver } from './admin_users.resolver';
import { AdminUsersService } from './admin_users.service';

@Module({
  providers: [AdminUsersResolver, AdminUsersService],
})
export class AdminUsersModule {}
