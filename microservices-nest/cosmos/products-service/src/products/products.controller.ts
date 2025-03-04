import { Body, Controller, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductDto } from 'src/dto/create-product.dto';
import { ProductsService } from './products.service';
import { products } from 'src/entity/products.entity';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) { }

    /* 
    * Products Added to Inventory 
    * Method: POST
    * Return: Product 
    */
    @Post()
    async create(@Body() productDto: ProductDto) {
        return await this.productService.create(productDto);
    }

    @Get(":id")
    async findProductById(@Param('id') id: number): Promise<products> {
        return await this.productService.findProductById(id);
    }
    @Get()
    async findAllProduct(): Promise<products[]> {
        return await this.productService.findAllProduct();
    }
    @Get(":id/validate")
    async validateStock(@Param('id')id: number,@Query('quantity')quantity: number): Promise<boolean> {
        return await this.productService.validateStock(id,quantity);
    }

    @Patch(":id/reduce")
    async buyProduct(@Param('id')id: number,@Query('quantity')quantity: number): Promise<products> {
        return await this.productService.buyProduct(id,quantity);
    }
}
