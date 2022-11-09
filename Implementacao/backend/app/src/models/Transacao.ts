import { Aluno } from './Aluno';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Professor } from "./Professor";

@Entity('transacoes')
export class Transacao {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    motivo: string

    @Column({type: 'double'})
    valor: number

    @ManyToOne(() => Professor, professor => professor.transacoes)
    @JoinColumn({ name: 'professorId' })
    professor: Professor

    @ManyToOne(() => Aluno, aluno => aluno.transacoes)
    @JoinColumn({ name: 'alunoId' })
    aluno: Aluno
}