
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ description: 'Título de la foto' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'URL de la imagen de la foto' })
  @IsString()
  image: string;

  @ApiProperty({ description: 'Precio de la foto', example: 49.99 })
  @IsNumber()
  price: number;
}
