import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from './Curso';
import { InstituicaoDeEnsino } from './InstituicaoDeEnsino';

@Entity('alunos')
export class Aluno {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text'})
    email: string

    @Column({type: 'text' })
    senha: string

    @Column({type: 'text' })
    cpf: string

    @Column({type: 'text' })
    rg: string

    @Column({type: 'text' })
    endereco: string

    @Column({type: 'int', default: 0 })
    qtdeMoedas: number

    @ManyToOne(() => Curso, curso => curso.alunos)
    @JoinColumn({ name: 'cursoId' })
    curso: Curso

    @ManyToOne(() => InstituicaoDeEnsino, instituicaoDeEnsinoId => instituicaoDeEnsinoId.alunos)
    @JoinColumn({ name: 'instituicaoDeEnsinoId' })
    instituicaoDeEnsino: InstituicaoDeEnsino
}