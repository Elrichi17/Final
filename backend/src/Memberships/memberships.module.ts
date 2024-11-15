
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from 'src/entities/membership.entity';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Membership])],
  providers: [MembershipsService],
  controllers: [MembershipsController],
})
export class MembershipsModule {}
