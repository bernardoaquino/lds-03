import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InstituicaoDeEnsino } from "./InstituicaoDeEnsino";
import { Professor } from "./Professor";

@Entity('departamentos')
export class Departamento {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    nome: string

    @ManyToOne(() => InstituicaoDeEnsino, instituicaoDeEnsinoId => instituicaoDeEnsinoId.departamentos)
    @JoinColumn({ name: 'instituicaoDeEnsinoId' })
    instituicaoDeEnsino: InstituicaoDeEnsino

    @OneToMany(() => Professor, professor => professor.departamento)
    professores: Professor[]
}