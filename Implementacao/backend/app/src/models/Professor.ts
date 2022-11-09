import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from "./Departamento";
import { Transacao } from "./Transacao";

@Entity('professores')
export class Professor {
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

    @Column({type: 'int', default: 0 })
    qtdeMoedas: number

    @ManyToOne(() => Departamento, departamento => departamento.professores)
    @JoinColumn({ name: 'departamentoId' })
    departamento: Departamento

    @OneToMany(() => Transacao, transacao => transacao.professor)
    transacoes: Transacao[]
}