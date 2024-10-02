import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from 'src/entities/admin_user.entity';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser) private adminUserRepository: Repository<AdminUser>,
  ) {}

  public async getAllAdminUsers(): Promise<AdminUser[]> {
    return this.adminUserRepository.find({});
  }
}
