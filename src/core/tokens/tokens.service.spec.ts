import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserPayload } from 'models/tokens/user-payload';
import { GetUserDto } from 'models/user/get-user.dto';
import { tokens, user } from '../../mock/data';
import { TokensService } from './tokens.service';

describe('TokensService', () => {
  let service: TokensService;
  let jwtService: JwtService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokensService, JwtService],
    }).compile();
    service = module.get<TokensService>(TokensService);
    jwtService = module.get<JwtService>(JwtService);
    let {id}: GetUserDto = {...user, id: 0} as GetUserDto;
    jest.spyOn(service, 'getAccessToken').mockReturnValue(new Promise<string>((resolve, reject) => resolve("<ACCESS-TOKEN>")));
    jest.spyOn(service, 'getRefreshToken').mockReturnValue(new Promise<string>((resolve, reject) => resolve("<REFRESH-TOKEN>")));
    jest.spyOn(jwtService, 'verifyAsync').mockReturnValue(new Promise<UserPayload>((resolve, reject) => resolve({id})));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should generate tokens', async () => {
    const { id }: GetUserDto = {...user, id: 0} as GetUserDto;
    const result = await service.generateTokens({id});
    expect(result.accessToken).toBe("<ACCESS-TOKEN>");
    expect(result.refreshToken).toBe("<REFRESH-TOKEN>");
    expect(result).toEqual(tokens)
  });
  it("should verify token", async () => {
    const { id }: GetUserDto = {...user, id: 0} as GetUserDto;
    const result = await service.verify("<ACCESS-TOKEN>");
    expect(result.id).toBe(id);
  });
});
