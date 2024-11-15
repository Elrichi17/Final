// src/events/events.controller.ts
import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from 'src/entities/event.entity';
import { CreateEventDto } from './create.events.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Devuelve todos los eventos.' })
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Devuelve un evento por ID.' })
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Crea un nuevo evento.' })
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  // Ruta para eliminar un evento
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un evento por ID.' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.eventsService.delete(+id);
  }
}
