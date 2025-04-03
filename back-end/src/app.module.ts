import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [UsersModule, PropertiesModule]
})
export class AppModule {}
