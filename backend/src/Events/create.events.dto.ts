// src/events/dto/create-event.dto.ts
import { IsString, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'Nombre del evento' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Fecha del evento' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Ubicación del evento' })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Modelos participantes en el evento (IDs)',
    example: ['1', '2'],
  })
  @IsArray()
  participatingModels: string[];

  @ApiProperty({
    description: 'Productos presentados en el evento (IDs)',
    example: ['101', '102'],
  })
  @IsArray()
  productsShowcased: string[];
}
