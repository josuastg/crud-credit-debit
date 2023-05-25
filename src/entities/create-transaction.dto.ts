import { IsNotEmpty } from "class-validator";

export class CreateTransactionDto {

    tanggal_transaksi: string;

    @IsNotEmpty()
    uraian_transaksi: string;

    @IsNotEmpty()
    tipe_transaksi: string;

    @IsNotEmpty()
    nominal: number;

    saldo_akhir:number;
}
