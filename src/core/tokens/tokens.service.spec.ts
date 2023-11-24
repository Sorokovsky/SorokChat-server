import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { GetUserDto } from 'models/user/get-user.dto';
import { tokens, user } from '../../mock/data';
import { TokensService } from './tokens.service';

describe('TokensService', () => {
  let service: TokensService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokensService, JwtService],
    }).compile();
    service = module.get<TokensService>(TokensService);
    jest.spyOn(service, 'getAccessToken').mockReturnValue(new Promise<string>((resolve, reject) => resolve("<ACCESS-TOKEN>")));
    jest.spyOn(service, 'getRefreshToken').mockReturnValue(new Promise<string>((resolve, reject) => resolve("<REFRESH-TOKEN>")));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should generate tokens', async () => {
    const { id }: GetUserDto = user as GetUserDto;
    const result = await service.generateTokens({id});
    expect(result.accessToken).toBe("<ACCESS-TOKEN>");
    expect(result.refreshToken).toBe("<REFRESH-TOKEN>");
    expect(result).toEqual(tokens)
  });
});
