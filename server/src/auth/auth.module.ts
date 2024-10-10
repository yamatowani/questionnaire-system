import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AdminUsersModule } from 'src/modules/admin_users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolever';
import { JwtAuthGuard } from './auth-guard';

@Module({
  imports: [
    forwardRef(() => AdminUsersModule),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
