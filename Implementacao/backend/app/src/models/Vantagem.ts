import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./Empresa";

@Entity('vantagem')
export class Vantagem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    descricao: string

    @Column({type: 'text', nullable: true })
    fotoProdutoUrl: string

    @Column({type: 'int', default: 0 })
    custoMoedas: number

    @ManyToOne(() => Empresa)
    @JoinColumn({ name: 'empresaId' })
    empresa: Empresa
}