import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './modules/transaction.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [ormConfig],
    expandVariables: true
  }),
  TypeOrmModule.forRootAsync({
    useFactory: ormConfig
  }),
    TransactionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
