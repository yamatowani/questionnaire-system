import { Test, TestingModule } from '@nestjs/testing';
import { AdminUsersResolver } from './admin_users.resolver';

describe('AdminUsersResolver', () => {
  let resolver: AdminUsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminUsersResolver],
    }).compile();

    resolver = module.get<AdminUsersResolver>(AdminUsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
