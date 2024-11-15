import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Model } from 'src/entities/model.entity';
import { CreateModelDto } from './create-model.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Models') 
@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Devuelve todos los modelos.' })
  findAll(): Promise<Model[]> {
    return this.modelsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Devuelve un modelo por ID.' })
  findOne(@Param('id') id: string): Promise<Model> {
    return this.modelsService.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Crea un nuevo modelo.' })
  create(@Body() createModelDto: CreateModelDto): Promise<Model> {
    return this.modelsService.create(createModelDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un modelo por ID.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.modelsService.remove(+id);
  }
}
