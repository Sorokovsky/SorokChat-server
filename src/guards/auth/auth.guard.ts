import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from 'models/tokens/user-payload';
import { TokensService } from '../../core/tokens/tokens.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokensService: TokensService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const accessToken: string | undefined = this.extractTokenFromHeader(request);
      const refreshToken: string | undefined = request.cookies ? request.cookies['refreshToken'] : undefined;
      if (!accessToken && !refreshToken) throw new UnauthorizedException();
      if(accessToken) {
        const payload: UserPayload = await this.tokensService.verify(accessToken);
        if(!payload.id) throw new UnauthorizedException();
          request['id'] = payload.id;
          return true;
      } else {
        const payload: UserPayload = await this.tokensService.verify(refreshToken);
        if(payload.id) {
          if(!payload.id) throw new UnauthorizedException();
          request['id'] = payload.id;
          return true;
        }
      }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
export const Auth = () => UseGuards(AuthGuard);