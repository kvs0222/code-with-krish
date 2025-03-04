import { Controller, Injectable, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService ){}
    
    @Post()
    async sendNotification(){
        await this.notificationsService.notificationConfirm();
    }
}
