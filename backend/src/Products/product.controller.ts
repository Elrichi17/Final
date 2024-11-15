// src/products/products.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from './create.product.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Devuelve todos los productos.' })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Devuelve un producto por ID.' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Crea un nuevo producto.' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un producto por ID.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}
