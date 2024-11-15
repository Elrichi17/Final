// src/events/events.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/entities/event.entity';
import { CreateEventDto } from './create.events.dto';
import { ModelsService } from 'src/models/models.service';
import { ProductsService } from 'src/Products/product.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private modelsService: ModelsService,
    private productsService: ProductsService,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOneBy({ id });
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    // Validar si los modelos existen
    for (const modelId of createEventDto.participatingModels) {
      const modelExists = await this.modelsService.findOne(Number(modelId));
      if (!modelExists) {
        throw new Error(`Modelo con ID ${modelId} no encontrado`);
      }
    }

    // Validar si los productos existen
    for (const productId of createEventDto.productsShowcased) {
      const productExists = await this.productsService.findOne(Number(productId));
      if (!productExists) {
        throw new Error(`Producto con ID ${productId} no encontrado`);
      }
    }

    const event = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(event);
  }

  // Método para eliminar un evento
  async delete(id: number): Promise<void> {
    const event = await this.eventsRepository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }

    await this.eventsRepository.remove(event); // Elimina el evento de la base de datos
  }
}
