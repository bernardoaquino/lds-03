import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import StudentRepository from '../repositories/StudentRepository';

class StudentController {
    constructor() {}
    
    create = async (req: Request, res: Response) => {
        try {
            const { student, courseId } = req.body;

            await StudentRepository.create(student, courseId);

            return res.status(StatusCodes.CREATED).send();
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'STD500C',
                message: error?.message ?? 'No message'
            })
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.aluno;
            const { student, courseId } = req.body;

            if (!id) {
                throw new Error('Ocorreu um erro ao recuperar informações do aluno');
            }

            const updatedStudent = await StudentRepository.update(id, student, courseId);

            return res.status(StatusCodes.OK).json({ updatedStudent });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'STD500U',
                message: error?.message ?? 'No message'
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;

            if (!id) {
                throw new Error('Você precisa fornecer o ID do aluno a ser removido');
            }

            const deleted = await StudentRepository.delete(id);

            if (!deleted) {
                throw new Error('Ocorreu um erro ao deletar o aluno');
            }

            return res.status(StatusCodes.GONE).json({ deleted });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'STD500D',
                message: error?.message ?? 'No message'
            })
        }
    }

    acquireAdvantage = async (req: Request, res: Response) => {
        try {
            const { id } = req.aluno;
            const { advantageId } = req.body;

            if (!id) {
                throw new Error('Você precisa estar autenticado para adquirir uma vantagem');
            }

            if (!advantageId) {
                throw new Error('Você precisa fornecer o ID da vantagem a ser adquirida');
            }

            const acquiredAdvantage = await StudentRepository.acquireAdvantage(id, advantageId);

            return res.status(StatusCodes.CREATED).json({ acquiredAdvantage });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'STD500AA',
                message: error?.message ?? 'No message'
            })
        }
    }

}

export default new StudentController();