import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('empresas')
export class Empresa {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    email: string

    @Column({type: 'text' })
    senha: string
}