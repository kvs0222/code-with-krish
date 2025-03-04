import { BadRequestException, Injectable } from '@nestjs/common';
import { Dispatchers } from './entity/dispatchers.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDispatcherDto } from './dto/create-dispatchers.dto';
import { Kafka } from 'kafkajs';

@Injectable()
export class DispatchersService {
    private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({ groupId: 'pradeepa-dispatcher-service' });

    constructor(@InjectRepository(Dispatchers)private dipatcherRepository: Repository<Dispatchers>){}

    async onModuleInit() {
        await this.producer.connect()
        await this.consumer.connect()
        await this.dispatcherConfirmed()
    }
    async create(createDispatcherDto: CreateDispatcherDto){

        const dipatcherExsist = await this.dipatcherRepository.findOne({
            where: {vehicle_number: createDispatcherDto.vehicle_number},
        })
        if(dipatcherExsist){
            throw new BadRequestException('Dispatcher already exsists ');
        }

        const dipatcher = this.dipatcherRepository.create(createDispatcherDto);

        return this.dipatcherRepository.save(dipatcher);
    }

    async getAll(city: any){
        const dipatcherExsist = await this.dipatcherRepository.findOne({
            where: {city},
        })

        if(!dipatcherExsist){
            throw new BadRequestException(`Dispatcher not available for city: ${city}`)
        }else{
            return dipatcherExsist;
        }

    }

    async dispatcherConfirmed(){

    }
}

