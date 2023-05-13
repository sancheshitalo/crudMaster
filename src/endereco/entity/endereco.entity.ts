import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endereco extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endereco: string;

  @Column()
  numero: number;

  @Column()
  bairro: string;
}
