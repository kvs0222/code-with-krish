import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {

  constructor(@InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {

    const existingCustomer = await this.customerRepository.findOne({
      where: { email: createCustomerDto.email },
    });
    if (existingCustomer) {
      throw new BadRequestException('Email already in used');
    }

    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async fetch(id: any) {

    const existingCustomer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!existingCustomer) {
      throw new BadRequestException(`No Customer found in Id: ${id}`);
    } else {
      return existingCustomer;
    }
  }

  async fetctAll() {
    return await this.customerRepository.find();
  }
}
