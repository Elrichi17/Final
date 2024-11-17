import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Membership } from './entities/membership.entity';
import { Model } from './entities/model.entity';
import { Photo } from './entities/photo.entity';
import { Product } from './entities/product.entity';
import { ModelsModule } from './models/models.module';
import { ProductsModule } from './Products/product.module';
import { PhotosModule } from './Photos/photos.module';
import { MembershipsModule } from './Memberships/memberships.module';
import { EventsModule } from './Events/events.module';
import { PaymentsModule } from './Payments/payments.module';

@Module({
  imports: [
   TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
}),

    TypeOrmModule.forFeature([Event, Membership, Model, Photo, Product]),
    ModelsModule,ProductsModule,PhotosModule,MembershipsModule,EventsModule,PaymentsModule
  ],
})
export class AppModule {}
