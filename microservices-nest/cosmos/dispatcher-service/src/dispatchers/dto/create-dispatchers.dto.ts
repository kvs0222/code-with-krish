import { IsInt, IsString } from "class-validator";

export class CreateDispatcherDto{
    @IsInt()
    vehicle_number: number;
    @IsString()
    city: string;
}