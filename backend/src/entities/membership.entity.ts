
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tier: string;

  @Column()
  benefit: string;

  @Column('float')
  price: number;
}
