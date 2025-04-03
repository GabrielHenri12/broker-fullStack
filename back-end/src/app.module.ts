import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [UsersModule, PropertiesModule, ReviewsModule]
})
export class AppModule {}
