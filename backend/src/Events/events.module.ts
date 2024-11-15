// src/events/events.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entities/event.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ModelsModule } from 'src/models/models.module'; 
import { ProductsModule } from 'src/Products/product.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Event]), ModelsModule, ProductsModule],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
