import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { BcryptStrategy } from './strategies/bcrypt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BcryptStrategy, PrismaService],
})
export class AuthModule {}
