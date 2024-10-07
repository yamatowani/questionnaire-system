import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminUsersService } from "src/services/admin_users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private adminUsersService: AdminUsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey'
    })
  }

  async validate(payload: any) {
    return { adminUserId: payload.sub, name: payload.name }
  }
}
