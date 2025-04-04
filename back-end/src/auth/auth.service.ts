import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BcryptStrategy } from './strategies/bcrypt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _jwtStrategy: JwtStrategy,
    private readonly _bcryptStrategy: BcryptStrategy,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this._prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new Error('Autenticação falhou');
    }
    const isPasswordValid = await this._bcryptStrategy.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Autenticação falhou');
    }

    const token = this._jwtStrategy.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return token;
  }
}
