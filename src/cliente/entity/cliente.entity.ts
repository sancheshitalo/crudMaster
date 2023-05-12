import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    idade: number
}