// src/memberships/memberships.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { Membership } from 'src/entities/membership.entity';
import { CreateMembershipDto } from './create.membership.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Memberships')
@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Devuelve todas las membresías.' })
  findAll(): Promise<Membership[]> {
    return this.membershipsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Devuelve una membresía por ID.' })
  findOne(@Param('id') id: string): Promise<Membership> {
    return this.membershipsService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Crea una nueva membresía.' })
  create(@Body() createMembershipDto: CreateMembershipDto): Promise<Membership> {
    return this.membershipsService.create(createMembershipDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina una membresía por ID.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.membershipsService.remove(+id);
  }
}
