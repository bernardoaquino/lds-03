import bcrypt from 'bcrypt';

/** DataSource */
import { AppDataSource } from '../data-source';

/** Models */
import { Professor } from './../models/Professor';
import { Transacao } from '../models/Transacao';

/** Repositories */
import ProfessorRepository from './ProfessorRepository';
import StudentRepository from './StudentRepository';

class TransferRepository {
    private dataSource = AppDataSource.getRepository(Transacao);

    constructor() {}
    
    create = async (professor: Professor, transfer: Transacao, studentId: number): Promise<Transacao> => {
        const student = await StudentRepository.getById(studentId);

        if (!student) {
            throw new Error('Estudante não encontrado');
        }

        if (transfer.valor > professor.qtdeMoedas) {
            throw new Error('Saldo insuficiente');
        }

        const newTransfer = this.dataSource.create({ ...transfer, professor, aluno: student });

        await this.dataSource.save(newTransfer);

        await StudentRepository.update(student.id, { qtdeMoedas: (student.qtdeMoedas + transfer.valor) });
        await ProfessorRepository.update(professor.id, { qtdeMoedas: (professor.qtdeMoedas - transfer.valor) });

        return newTransfer;
    }

    list = async (id: number, isProfessor: boolean = false): Promise<Transacao[]> => {
        if (isProfessor) {
            return this.dataSource.find({
                where: {
                    aluno: {
                        id
                    }
                }
            })
        } else {
            return this.dataSource.find({
                where: {
                    professor: {
                        id
                    }
                }
            })
        }
    }
}

export default new TransferRepository();
