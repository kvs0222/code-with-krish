import { IsDecimal, IsInt, IsNotEmpty, IsString } from "class-validator";



export class ProductDto {

    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
    @IsDecimal()
    @IsNotEmpty({ message: 'Price is required' })
    price: number;
    @IsInt()
    @IsNotEmpty({ message: 'Quantity is required' })
    quantity: number;
}