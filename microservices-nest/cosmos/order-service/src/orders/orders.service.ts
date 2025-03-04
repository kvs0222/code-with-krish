import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderstatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Kafka } from 'kafkajs';
// import { Observable } from 'rxjs';
// import { AxiosResponse } from 'axios';
// import { error } from 'console';


@Injectable()
export class OrdersService implements OnModuleInit {
    private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({ groupId: 'pradeepa-order-service' });
  
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        private readonly httpService: HttpService) {

    }

    async onModuleInit() {
        await this.producer.connect()
        await this.consumer.connect()
        await this.consumerConfirmed()
    }

    async create(createOrderDto: CreateOrderDto): Promise<any> { //#todo need to handle null below return
        const { customerId, items } = createOrderDto;
        
        const existingCustomer = await this.verifyCustomer(createOrderDto);
        // const isAvailable = await this.isStockAvailable(createOrderDto.);
        if (!existingCustomer) {
            throw new NotFoundException(`Customer id: ${createOrderDto.customerId} not found `);
        }
        let customerName= existingCustomer.customerName;
        let city = existingCustomer.city;

        items.forEach(async item => {
            const isAvailable = await this.isStockAvailable(item.productId,item.quantity);
            if(!isAvailable){
                throw new NotFoundException(`Product id: ${item.productId} out of stock `);
            }

        });

        this.producer.send({
            topic: `pradeepa-order.create`,
            messages: [{ value: JSON.stringify({ customerId, customerName,city, items }) }]
          });
          return { message: `order is placed , waiting inventory service to process` };

        // const order = this.orderRepository.create({
        //     customerId,
        //     status: 'PENDING',
        // });
        // const saveOrder: Order = await this.orderRepository.save(order);

        // const orderItems = items.map((item) =>
        //     this.orderItemRepository.create({
        //         productId: item.productId,
        //         price: item.price,
        //         quantity: item.quantity,
        //         order: saveOrder,
        //     })
        // )

        // for(const item of items){

        //     this.buyProducts(item.productId,item.quantity);
        // }

        // await this.orderItemRepository.save(orderItems);
        // return this.orderRepository.findOne({
        //     where: { id: saveOrder.id },
        //     relations: ['items'],
        // });
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

    async consumerConfirmed() {
        await this.consumer.subscribe({ topic: 'pradeepa-order.create' });
    
        await this.consumer.run({
          eachMessage: async ({ message }) => {
            console.log('Order Service .............');
            const { customerId, customerName,city, items } = JSON.parse(
              message.value.toString()
            );
            const orderCreate = this.orderRepository.create({
              customerId,
              city,
              status: Orderstatus.CONFIRMED,
            });
            const savedOrder = await this.orderRepository.save(orderCreate);
    
            const orderItems = items.map((item) =>
              this.orderItemRepository.create({
                productId: item.productId,
                price: item.price,
                quantity: item.quantity,
                order: savedOrder,
              }),
            );
    
            await this.orderItemRepository.save(orderItems);
            this.producer.send({
              topic: 'pradeepa-order.confirmed',
              messages: [{value: JSON.stringify(customerId,city)}]
            });
          }
        })
    
    
      }
}
