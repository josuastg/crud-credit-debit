import { Controller, Get, NotFoundException, Param, Post, Body, ValidationPipe, Delete, HttpCode, Put } from "@nestjs/common";
import { CreateTransactionDto } from "src/entities/create-transaction.dto"
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "src/entities/transaction";
import { Repository } from "typeorm";
import { UpdateTransactionDto } from "src/entities/update-transcation.dto";


@Controller('/transaction')
export class TransactionController {
    constructor(
        @InjectRepository(Transaction)
        private readonly repository: Repository<Transaction>,
    ) { }

    @Get()
    async findAll() {
        const lengthData = (await this.repository.find()).length
        if (!lengthData) {
            await this.createTransaction({
                tanggal_transaksi: new Date().toISOString().slice(0, 10),
                nominal: 1000000,
                tipe_transaksi: "Debit",
                uraian_transaksi: "Saldo Awal",
                saldo_akhir: 1000000
            })
        }
        return await this.repository.find();
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        const transaction = await this.repository.findOneBy({ id });
        if (!transaction) {
            throw new NotFoundException();
        }
        return transaction;
    }

    @Post('/create')
    async createTransaction(@Body(ValidationPipe) payload: CreateTransactionDto) {
        let result = await this.repository.save({
            ...payload
        });
        if ((await this.findAll()).length > 1 && result) {
            const prevSaldoAkhir = (await this.repository.findOneBy({ id: result.id - 1 }))
            if (prevSaldoAkhir) {
                result = await this.update(result.id, {
                    tanggal_transaksi: new Date().toISOString().slice(0, 10),
                    nominal: payload.nominal,
                    tipe_transaksi: payload.tipe_transaksi,
                    uraian_transaksi: payload.uraian_transaksi,
                    saldo_akhir: payload.tipe_transaksi === 'Debit' ?
                        prevSaldoAkhir.saldo_akhir + payload.nominal
                        : prevSaldoAkhir.saldo_akhir - payload.nominal
                });
            }
        }
        return result;
    }

    @Put(':id')
    async update(@Param('id') id, @Body() input: UpdateTransactionDto) {
        const transaction = await this.repository.findOneBy({ id });
        if (!transaction) {
            throw new NotFoundException();
        }
        return await this.repository.save({
            ...transaction,
            ...input
        });
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const transcation = await this.repository.findOneBy({ id });
        if (!transcation) {
            throw new NotFoundException();
        }
        await this.repository.remove(transcation);
    }
}