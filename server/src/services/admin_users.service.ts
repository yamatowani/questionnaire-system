import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from 'src/entities/admin_user.entity';
import { RegisterAdminUserInput } from 'src/dto/input/registerAdminUser';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
  ) {}

  async findOneByEmail(email: string): Promise<AdminUser | undefined> {
    return this.adminUserRepository.findOneBy({ email });
  }

  public async createNewAdminUser(
    registerAdminUserInput: RegisterAdminUserInput,
  ): Promise<AdminUser> {
    const hashedPassword = await bcrypt.hash(
      registerAdminUserInput.password,
      10,
    );

    const createdAdminUser = this.adminUserRepository.create({
      ...registerAdminUserInput,
      password_digest: hashedPassword,
    });

    await this.adminUserRepository.save(createdAdminUser);
    return createdAdminUser;
  }
}
