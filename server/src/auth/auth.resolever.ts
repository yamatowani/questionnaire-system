import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from '../dto/output/auth.response';
import { AuthenticateAdminUserInput } from 'src/dto/input/authenticateAdminUser';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async authenticateAdminUser(
    @Args('authenticateAdminUserInput')
    authenticateAdminUserInput: AuthenticateAdminUserInput,
  ) {
    const user = await this.authService.validateUser(
      authenticateAdminUserInput.email,
      authenticateAdminUserInput.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
