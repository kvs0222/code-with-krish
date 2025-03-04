import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class products{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0})
    price: number;
    @Column()
    quantity: number;
}