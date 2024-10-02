import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersResolver } from '../resolvers/admin_users.resolver';
import { AdminUsersService } from '../services/admin_users.service';
import { AdminUser } from 'src/entities/admin_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [AdminUsersResolver, AdminUsersService],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
