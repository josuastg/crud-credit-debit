import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transaction';
import { TransactionController } from 'src/controller/transaction.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction])],
    controllers: [TransactionController]
})
export class TransactionModule { }
