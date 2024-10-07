import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AdminUsersModule } from 'src/modules/admin_users.module';
import { JwtStrategy } from './jwt.strategy';

   @Module({
     imports: [
       AdminUsersModule,
       PassportModule,
       JwtModule.register({
         secret: 'secretKey',
         signOptions: { expiresIn: '60m' },
       }),
     ],
     providers: [AuthService, JwtStrategy],
     exports: [AuthService],
   })
   export class AuthModule {}
