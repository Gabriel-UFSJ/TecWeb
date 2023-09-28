// testimonial.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Testimonial extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  message: string;

  @Column()
  date: Date;

  // Adicione outros campos conforme necessário
}
