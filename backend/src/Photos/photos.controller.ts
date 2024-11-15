
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from 'src/entities/photo.entity';
import { CreatePhotoDto } from './create.photo.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Devuelve todas las fotos.' })
  findAll(): Promise<Photo[]> {
    return this.photosService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Devuelve una foto por ID.' })
  findOne(@Param('id') id: string): Promise<Photo> {
    return this.photosService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Crea una nueva foto.' })
  create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.photosService.create(createPhotoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina una foto por ID.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.photosService.remove(+id);
  }
}
