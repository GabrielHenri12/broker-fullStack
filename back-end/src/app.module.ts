import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PropertiesModule, ReviewsModule, AuthModule]
})
export class AppModule {}
