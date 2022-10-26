import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aluno } from "./Aluno";
import { Curso } from "./Curso";

@Entity('instituicoes')
export class InstituicaoDeEnsino {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    email: string

    @Column({type: 'text'})
    nome: string

    @Column({type: 'text' })
    senha: string

    @OneToMany(() => Aluno, aluno => aluno.instituicaoDeEnsino)
    alunos: Aluno[]
    
    @OneToMany(() => Curso, curso => curso.instituicaoDeEnsino)
    cursos: Curso[]
}