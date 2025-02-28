import { IsEmail, IsOptional, IsString, Matches } from "class-validator";


export class CreateCustomerDto{
    
    @IsString()
    name: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @IsOptional()
    address: string;
}