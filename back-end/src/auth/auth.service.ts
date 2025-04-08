import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BcryptStrategy } from './strategies/bcrypt.strategy';
import { MeAuthDto } from './dto/me-auth.dto';

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
  async me(id: string): Promise<MeAuthDto> {
    const user = await this._prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
