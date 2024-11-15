
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  portfolio: string;

  @Column()
  bookingInfo: string;
}
