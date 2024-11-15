
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @Column('text', { array: true })
  participatingModels: string[];

  @Column('text', { array: true })
  productsShowcased: string[];
}
