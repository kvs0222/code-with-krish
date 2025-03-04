import { IsEnum } from "class-validator";

export enum Orderstatus{
    PENDING='PENDING',
    CONFIRMED='CONFIRMED',
    SHIPPED='SHIPPED',
    DELIVERED='DELIVERED',
    CANCEL='CANCEL',
}

export class UpdateOrderStatus{
    @IsEnum(Orderstatus)
    status: Orderstatus;
}