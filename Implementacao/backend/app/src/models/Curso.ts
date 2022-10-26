import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aluno } from "./Aluno";
import { InstituicaoDeEnsino } from "./InstituicaoDeEnsino";

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @ManyToOne(() => InstituicaoDeEnsino, instituicaoDeEnsinoId => instituicaoDeEnsinoId.cursos)
    @JoinColumn({ name: 'instituicaoDeEnsinoId' })
    instituicaoDeEnsino: InstituicaoDeEnsino

    @OneToMany(() => Aluno, aluno => aluno.curso)
    alunos: Aluno[]
}