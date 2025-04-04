import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _jwtStrategy: JwtStrategy) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this._jwtStrategy.decodeToken(token);
      if (!decoded) {
        throw new UnauthorizedException('Token inválido ou expirado');
      }
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
