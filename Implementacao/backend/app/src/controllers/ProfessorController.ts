import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProfessorRepository from '../repositories/ProfessorRepository';

class ProfessorController {
    create = async (req: Request, res: Response) => {
        try {
            const { professor, departmentId } = req.body;

            await ProfessorRepository.create(professor, departmentId);

            return res.status(StatusCodes.CREATED).send();
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'PRF500C',
                message: error?.message ?? 'No message'
            })
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.instituicaoDeEnsino;
            const { professor, departmentId } = req.body;

            if (!id) {
                throw new Error('Ocorreu um erro ao recuperar informações do professor');
            }

            const updatedProfessor = await ProfessorRepository.update(id, professor, departmentId);

            return res.status(StatusCodes.OK).json({ updatedProfessor });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'PRF500U',
                message: error?.message ?? 'No message'
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;

            if (!id) {
                throw new Error('Você precisa fornecer o ID do professor a ser removido');
            }

            const deleted = await ProfessorRepository.delete(id);

            if (!deleted) {
                throw new Error('Ocorreu um erro ao deletar o professor');
            }

            return res.status(StatusCodes.GONE).json({ deleted });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'PRF500D',
                message: error?.message ?? 'No message'
            })
        }
    }
}

export default new ProfessorController();