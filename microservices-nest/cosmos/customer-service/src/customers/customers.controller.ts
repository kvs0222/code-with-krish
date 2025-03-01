import { Body, Controller, Get, Injectable, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {

    constructor(private customerService: CustomersService){}

    /* 
    * Customer onboading 
    * 
    */
    @Post()
    async create(@Body() createCustomerDto:CreateCustomerDto): Promise<any> {
        return await this.customerService.create(createCustomerDto);
    }

    @Get(":id")
    async getCustomer(@Param('id')id: number){
        return await this.customerService.fetch(id);
    }

    @Get()
    async getAllCustomer(){
        return await this.customerService.fetctAll();
    }
}
