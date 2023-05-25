import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transaction')
export class Transaction {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    tanggal_transaksi: string;

    @Column()
    uraian_transaksi: string;

    @Column()
    tipe_transaksi: string;

    @Column()
    nominal: number;

    @Column()
    saldo_akhir: number
}
