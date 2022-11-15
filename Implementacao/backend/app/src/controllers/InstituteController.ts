import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import InstituteRepository from '../repositories/InstituteRepository';

class InstituteController {
    constructor() {}
    
    create = async (req: Request, res: Response) => {
        try {
            const { institute } = req.body;

            await InstituteRepository.create(institute);

            return res.status(StatusCodes.CREATED).send();
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'INS500C',
                message: error?.message ?? 'No message'
            })
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.instituicaoDeEnsino;
            const { institute } = req.body;

            if (!id) {
                throw new Error('Ocorreu um erro ao recuperar informações da instituição');
            }

            const updatedInstitute = await InstituteRepository.update(id, institute);

            return res.status(StatusCodes.OK).json({ updatedInstitute });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'INS500U',
                message: error?.message ?? 'No message'
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;

            if (!id) {
                throw new Error('Você precisa fornecer o ID da instituição a ser removida');
            }

            const deleted = await InstituteRepository.delete(id);

            if (!deleted) {
                throw new Error('Ocorreu um erro ao deletar a instituição');
            }

            return res.status(StatusCodes.GONE).json({ deleted });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'INS500D',
                message: error?.message ?? 'No message'
            })
        }
    }
}

export default new InstituteController();