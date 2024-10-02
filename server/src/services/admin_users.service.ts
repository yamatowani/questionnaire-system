import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from 'src/entities/admin_user.entity';
import { NewAdminUserInput } from 'src/dto/new-admin_user.input';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser) private adminUserRepository: Repository<AdminUser>,
  ) {}

  public async getAllAdminUsers(): Promise<AdminUser[]> {
    return this.adminUserRepository.find({});
  }

  public async createNewAdminUser(newAdminUserData: NewAdminUserInput): Promise<AdminUser> {
    const newAdminUser = this.adminUserRepository.create(newAdminUserData);
    await this.adminUserRepository.save(newAdminUser)
    return newAdminUser
  };
}
