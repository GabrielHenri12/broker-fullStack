import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, AuthGuard, JwtStrategy],
})
export class ReviewsModule {}
