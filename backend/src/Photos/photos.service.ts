
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from 'src/entities/photo.entity';
import { CreatePhotoDto } from './create.photo.dto';
@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  findAll(): Promise<Photo[]> {
    return this.photosRepository.find();
  }

  findOne(id: number): Promise<Photo> {
    return this.photosRepository.findOneBy({ id });
  }

  create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const photo = this.photosRepository.create(createPhotoDto);
    return this.photosRepository.save(photo);
  }

  async remove(id: number): Promise<void> {
    await this.photosRepository.delete(id);
  }
}
