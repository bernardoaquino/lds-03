import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/** Repositories */
import ProfessorRepository from '../repositories/ProfessorRepository';
import StudentRepository from '../repositories/StudentRepository';
import TransferRepository from '../repositories/TransferRepository';

class TransferController {
    constructor() {}
    
    create = async (req: Request, res: Response) => {
        try {
            const { id } = req.professor;
            const { transfer, studentId } = req.body;

            if (!id) {
                throw new Error('Você precisa ser um professor autenticado para realizar essa operação');
            }

            const professor = await ProfessorRepository.getById(id);

            if (!professor) {
                throw new Error('Professor não encontrado');
            }

            await TransferRepository.create(professor, transfer, studentId);

            return res.status(StatusCodes.CREATED).send();
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'TRA500C',
                message: error?.message ?? 'No message'
            })
        }
    }

    list = async (req: Request, res: Response) => {
        try {
            let id = req?.professor?.id;
            let transferHistory = [];
    
            if (id) {
                transferHistory = await TransferRepository.list(id, true);
            } else {
                id = req.aluno.id;
    
                if (!id) {
                    throw new Error('Usuário não encontrado');
                }
    
                const transfers = await TransferRepository.list(id);
                const advantages = await StudentRepository.getAdvantagesByUserId(id);
    
                transferHistory = [...transfers, ...advantages];
            }
    
            res.status(StatusCodes.OK).json({ transferHistory });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'TRA500H',
                message: error?.message ?? 'No message'
            })
        }
    }
}

export default new TransferController();