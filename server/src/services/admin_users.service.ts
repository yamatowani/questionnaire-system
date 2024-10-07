import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from 'src/entities/admin_user.entity';
import { NewAdminUserInput } from 'src/dto/new-admin_user.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser) private adminUserRepository: Repository<AdminUser>,
  ) {}

  public async getAllAdminUsers(): Promise<AdminUser[]> {
    return this.adminUserRepository.find({});
  }

  public async createNewAdminUser(newAdminUserInput: NewAdminUserInput): Promise<AdminUser> {

    const hasedPassword = await bcrypt.hash(newAdminUserInput.password, 10);

    const newAdminUser = this.adminUserRepository.create({ ...newAdminUserInput, password_digest: hasedPassword});
    await this.adminUserRepository.save(newAdminUser)
    return newAdminUser
  };
}
