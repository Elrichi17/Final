import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModelDto {
  @ApiProperty({ description: 'Nombre del modelo' })
  @IsString()
  name: string;

 @ApiProperty({ description: 'URL de la foto del modelo', example:'model photo url' })
 @IsString()
    photo: string ;  

  @ApiProperty({
    description: 'URL del portafolio del modelo',
    example: 'https://potafolio.com',
  })
  @IsString()
  portfolio: string;

  @ApiProperty({
    description: 'Información de la reserva del modelo',
    example: 'Info de la Reserva',
  })
  @IsString()
  bookingInfo: string; 
}
