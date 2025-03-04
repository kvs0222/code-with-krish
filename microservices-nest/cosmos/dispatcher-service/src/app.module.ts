import { Module } from '@nestjs/common';

import { DispatchersModule } from './dispatchers/dispatchers.module';
import { Dispatchers } from './dispatchers/entity/dispatchers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DispatchersModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port: 3306,
    username: 'apiuser',
    password: '1qazxsw2##',
    database: 'cosmos',
    entities: [Dispatchers],
    synchronize: true //only dev env
  })]

})
export class AppModule {}
