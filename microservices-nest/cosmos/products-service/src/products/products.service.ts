import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/create-product.dto';
import { products } from 'src/entity/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(products) private readonly productRepository: Repository<products>) { }

    async create(productDto: ProductDto): Promise<products> {
        const existingProduct = await this.productRepository.findOne({
            where: { name: productDto.name },
        })
        if (existingProduct) {
            throw new BadRequestException(`this Product name: ${productDto.name} already exsist`);
        }
        const product = this.productRepository.create(productDto);

        return await this.productRepository.save(product);
    }

    async findProductById(id: any): Promise<products> {
        const existingProduct = await this.productRepository.findOne({
            where: { id: id },
        })
        if (!existingProduct) {
            throw new BadRequestException(`Product id: ${id} not exsist`);
        } else {
            return existingProduct;
        }

    }

    async findAllProduct(): Promise<products[]> {
        return await this.productRepository.find()
    }

    async validateStock(id: number,quantity: number): Promise<boolean>{
        const exsistingProduct = await this.productRepository.findOne({
            where: {
                id: id,
            }
        })
        if(!exsistingProduct?.quantity){
            throw new BadRequestException(`Product id: ${id} stock not available `)
        }

        return exsistingProduct.quantity<=quantity?false:true;
    }
    async buyProduct(id: number,quantity: number): Promise<products>{
        const exsistingProduct = await this.productRepository.findOne({
            where: {
                id: id,
            }
        })
        if(!exsistingProduct?.quantity){
            throw new BadRequestException(`Product id: ${id} not available `)
        }

        const available= exsistingProduct.quantity<=quantity?false:true;
        
        if(available){
            exsistingProduct.quantity=exsistingProduct.quantity-quantity;
            return await this.productRepository.save(exsistingProduct);
        }else{
            throw new NotFoundException(`Product id: ${id} order quantity not available `)
        }
    }
}
