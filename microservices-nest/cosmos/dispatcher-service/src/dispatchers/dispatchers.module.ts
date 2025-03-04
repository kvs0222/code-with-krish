import { Module } from '@nestjs/common';
import { DispatchersService } from './dispatchers.service';
import { DispatchersController } from './dispatchers.controller';
import { Dispatchers } from './entity/dispatchers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Dispatchers])],
  providers: [DispatchersService],
  controllers: [DispatchersController]
})
export class DispatchersModule {}
