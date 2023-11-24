import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { createMock } from '@golevelup/ts-jest';
import { TokensService } from '../../core/tokens/tokens.service';
import { UserPayload } from 'models/tokens/user-payload';
describe('AuthGuard', () => {
  let module: TestingModule;
  let authGuard: AuthGuard;
  let tokensService: TokensService;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [AuthGuard, TokensService, JwtService],
    }).compile();
    authGuard = module.get<AuthGuard>(AuthGuard);
    tokensService = module.get<TokensService>(TokensService);
  });
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
  it('should be correct audentification by accessToken', () => {
    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization: 'Bearer <KEY>',
      },
    });
    jest.spyOn(tokensService, "verify").mockReturnValue(new Promise<UserPayload>((resolve) => resolve({id: 0})));
    const canactivate = async () => await authGuard.canActivate(context);
    expect(canactivate).toBeTruthy();
  });
  it('should be correct audentification by refreshToken', () => {
    const context = createMock<ExecutionContext>();
    context.switchToHttp().getRequest.mockReturnValue({
      cookies: {
        refreshToken: '<KEY>',
      }
    });
    jest.spyOn(tokensService, "verify").mockReturnValue(new Promise<UserPayload>((resolve) => resolve({id: 0})));
    const canactivate = async () => await authGuard.canActivate(context);
    expect(canactivate).toBeTruthy();
  });
  it('should not be correct audentification', () => {
    jest.spyOn(tokensService, "verify").mockReturnValue(new Promise<UserPayload>((resolve) => resolve(null)));
    const context = createMock<ExecutionContext>();
    const canactivate = async () => await authGuard.canActivate(context);
    expect(canactivate).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
