import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from 'models/tokens/tokens.dto';
import { UserPayload } from 'models/tokens/user-payload';

@Injectable()
export class TokensService {
    constructor(private jwt: JwtService) {};
    async generateTokens(payload: UserPayload): Promise<TokensDto> {
        const accessToken = await this.getAccessToken(payload);
        const refreshToken = await this.getRefreshToken(payload);
        return { accessToken, refreshToken };
    }
    async getAccessToken(payload: UserPayload): Promise<string> {
        const accessToken: string = await this.jwt.signAsync(payload, {expiresIn: 1000 * 60 * 15});
        return accessToken;
    }
    async getRefreshToken(payload: UserPayload): Promise<string> {
        const refreshToken: string = await this.jwt.signAsync(payload, {expiresIn: 1000 * 60 * 60 * 24 * 7});
        return refreshToken;
    }
    async verify(token: string): Promise<UserPayload> {
        try {
            return await this.jwt.verifyAsync<UserPayload>(token);
        } catch (error) {
            throw new BadRequestException(error.message);
            
        }
    }
}
