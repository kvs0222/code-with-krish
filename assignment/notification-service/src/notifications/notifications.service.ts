import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationsService implements OnModuleInit{

    private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({ groupId: 'pradeepa-notification-service' });
  

    async onModuleInit() {
        this.producer.connect();
        this.consumer.connect();
        this.notificationConfirm();
    }

    async notificationSend(){
        
    }

    async notificationConfirm(){
        await this.consumer.subscribe({topic:  'pradeepa-order.confirmed'});

        await this.consumer.run({
            eachMessage: async({message})=>{
                console.log(``);
            }
        })
    }
}
