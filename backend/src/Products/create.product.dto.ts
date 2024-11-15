// src/products/dto/create-product.dto.ts
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del producto' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Precio del producto', example: 99.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Categoría del producto' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'URL de la imagen del producto' })
  @IsString()
  image: string;
}
