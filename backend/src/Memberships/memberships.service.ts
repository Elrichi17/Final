
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from 'src/entities/membership.entity';
import { CreateMembershipDto } from './create.membership.dto';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private membershipsRepository: Repository<Membership>,
  ) {}

  findAll(): Promise<Membership[]> {
    return this.membershipsRepository.find();
  }

  findOne(id: number): Promise<Membership> {
    return this.membershipsRepository.findOneBy({ id });
  }

  create(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    const membership = this.membershipsRepository.create(createMembershipDto);
    return this.membershipsRepository.save(membership);
  }

  async remove(id: number): Promise<void> {
    await this.membershipsRepository.delete(id);
  }
}
