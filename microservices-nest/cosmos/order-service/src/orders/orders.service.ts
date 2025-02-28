import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOrderStatus } from './dto/update-order.dto';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>) {

    }

    async create(createOrderDto: CreateOrderDto): Promise<Order | null> { //#todo need to handle null below return
    const { customerId, items } = createOrderDto;

    const order = this.orderRepository.create({
        customerId,
        status: 'PENDING',
    });
    const saveOrder: Order = await this.orderRepository.save(order);

    const orderItems = items.map((item)=>
        this.orderItemRepository.create({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
            order: saveOrder,
        })
    )

    await this.orderItemRepository.save(orderItems);
    return this.orderRepository.findOne({
        where :{id: saveOrder.id},
        relations: ['items'],
    });
}
    async fetch(id: any){
        await this.orderRepository.findOne({
            where: {id},
            relations: ['items'],
        })
    }
    async fetchAll(){
        await this.orderRepository.find({
            relations: ['items'],
        })
    }

    async updateOrderStatus(id: number,updateOrderStatus: UpdateOrderStatus){
        const order = await this.orderRepository.findOne({where: {id}});
        if(!order){
            throw new NotFoundException('Order with id: ${id} is not found');
        }
        
    }
}
