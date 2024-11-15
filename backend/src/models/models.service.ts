import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from 'src/entities/model.entity';
import { CreateModelDto } from './create-model.dto';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private modelsRepository: Repository<Model>,
  ) {}

  findAll(): Promise<Model[]> {
    return this.modelsRepository.find();
  }

  findOne(id: number): Promise<Model> {
    return this.modelsRepository.findOneBy({ id });
  }

  create(createModelDto: CreateModelDto): Promise<Model> {
    const model = this.modelsRepository.create(createModelDto);
    return this.modelsRepository.save(model);
  }

  async remove(id: number): Promise<void> {
    await this.modelsRepository.delete(id);
  }
}
