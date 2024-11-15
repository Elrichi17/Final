
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMembershipDto {
  @ApiProperty({ description: 'Nivel de la membresía' })
  @IsString()
  tier: string;

  @ApiProperty({ description: 'Beneficios de la membresía' })
  @IsString()
  benefit: string;

  @ApiProperty({ description: 'Precio de la membresía', example: 99.99 })
  @IsNumber()
  price: number;
}
