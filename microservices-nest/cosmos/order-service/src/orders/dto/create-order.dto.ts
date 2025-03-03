import { Type } from "class-transformer";
import { IsArray, IsInt, ValidateNested } from "class-validator";


export class CreateOrderItemDto{
    @IsInt()
    productId: number;
    @IsInt()
    price: number;
    @IsInt()
    quantity: number;

}

export class CreateOrderDto{
    @IsInt()
    customerId: number;
    @IsArray()
    @ValidateNested({each: true})
    @Type(()=> CreateOrderItemDto)
    items: CreateOrderItemDto[];
    static customerId: any;

}