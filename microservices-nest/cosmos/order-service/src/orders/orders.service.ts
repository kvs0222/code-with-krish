import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderstatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
// import { Observable } from 'rxjs';
// import { AxiosResponse } from 'axios';
// import { error } from 'console';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        private readonly httpService: HttpService) {

    }

    async create(createOrderDto: CreateOrderDto): Promise<Order | null> { //#todo need to handle null below return
        const { customerId, items } = createOrderDto;
        const existingCustomer = await this.verifyCustomer(createOrderDto);
        // const isAvailable = await this.isStockAvailable(createOrderDto.);
        if (!existingCustomer) {
            throw new NotFoundException(`Customer id: ${createOrderDto.customerId} not found `);
        }
        items.forEach(async item => {
            const isAvailable = await this.isStockAvailable(item.productId,item.quantity);
            if(!isAvailable){
                throw new NotFoundException(`Product id: ${item.productId} out of stock `);
            }

        });
        const order = this.orderRepository.create({
            customerId,
            status: 'PENDING',
        });
        const saveOrder: Order = await this.orderRepository.save(order);

        const orderItems = items.map((item) =>
            this.orderItemRepository.create({
                productId: item.productId,
                price: item.price,
                quantity: item.quantity,
                order: saveOrder,
            })
        )

        for(const item of items){

            this.buyProducts(item.productId,item.quantity);
        }

        await this.orderItemRepository.save(orderItems);
        return this.orderRepository.findOne({
            where: { id: saveOrder.id },
            relations: ['items'],
        });
    }
    async fetch(id: any) {
        await this.orderRepository.findOne({
            where: { id },
            relations: ['items'],
        })
    }
    async fetchAll() {
        await this.orderRepository.find({
            relations: ['items'],
        })
    }

    async updateOrderStatus(id: number, updateOrderStatus: UpdateOrderStatus): Promise<Order> {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new NotFoundException(`Order with id: ${id} is not found`);
        }
        if (order.status === Orderstatus.DELIVERED ||
            order.status === Orderstatus.CANCEL) {
            throw new BadRequestException(`order status cannot be changed when its delivered or canceled `)
        }
        order.status = updateOrderStatus.status;
        return await this.orderRepository.save(order);
    }

    async verifyCustomer(createOrderDto: CreateOrderDto) {
        const baseUrl = `http://localhost:3002/customers/${createOrderDto.customerId}`;
        const cutomerResponse = await firstValueFrom(this.httpService.get(baseUrl));
        return cutomerResponse.data;
    }

    async isStockAvailable(productId: number,quantity: number) {
        const baseUrl = `http://localhost:3001/products/${productId}/validate/?quantity=${quantity}`;
        const cutomerResponse = await firstValueFrom(this.httpService.get(baseUrl));
        return cutomerResponse.data;
    }

    async buyProducts(productId: number,quantity: number) {
        const baseUrl = `http://localhost:3001/products/${productId}/reduce/?quantity=${quantity}`;
        const cutomerResponse = await firstValueFrom(this.httpService.patch(baseUrl));
        return cutomerResponse.data;
    }
}
