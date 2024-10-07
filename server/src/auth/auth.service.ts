import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminUsersService } from 'src/services/admin_users.service';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from 'src/entities/admin_user.entity';

@Injectable()
export class AuthService {
  constructor(
    private adminUsersService: AdminUsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.adminUsersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password_digest)) {
      const { password_digest, ...result } = user;
      return result;
    }
    return null; 
  }

  async login(user: AdminUser) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
