import { Body, Controller, Get, Post } from '@nestjs/common';
import { DispatchersService } from './dispatchers.service';
import { CreateDispatcherDto } from './dto/create-dispatchers.dto';

@Controller('dispatchers')
export class DispatchersController {

    constructor(private dispatcherService: DispatchersService){}

    @Post()
    async create(@Body() createDispatcherDto: CreateDispatcherDto){
        return await this.dispatcherService.create(createDispatcherDto);
    }

    @Get()
    async getDipatcher(@Body() createDispatcherDto: CreateDispatcherDto){
        return await this.dispatcherService.getAll(createDispatcherDto.city);
    }
}
