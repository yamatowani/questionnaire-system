import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from '../dto/output/auth.response';
import { AuthInput } from '../dto/input/auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async authenticateAdminUser(@Args('authInput') authInput: AuthInput) {
    const user = await this.authService.validateUser(
      authInput.email,
      authInput.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
