import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { products } from './entity/products.entity';


@Module({
  imports: [ProductsModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOSTNAME || 'localhost',
    port: 3306,
    username: 'apiuser',
    password: '1qazxsw2##',
    database: 'cosmos',
    entities: [products],
    synchronize: true //this only for dev env?
  })],  
})
export class AppModule {}
