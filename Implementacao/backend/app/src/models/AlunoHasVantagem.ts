import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Aluno } from "./Aluno";
import { Vantagem } from "./Vantagem";

@Entity('alunoHasVantagem')
export class AlunoHasVantagem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    cupomGerado: string

    @ManyToOne(() => Aluno)
    @JoinColumn({ name: 'alunoId' })
    alunoId: Aluno

    @ManyToOne(() => Vantagem)
    @JoinColumn({ name: 'vantagemId' })
    vantagemId: Vantagem
}