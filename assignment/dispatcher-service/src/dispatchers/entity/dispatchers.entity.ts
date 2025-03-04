import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dispatchers {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    vehicle_number: number;
    @Column()
    city: string;
}