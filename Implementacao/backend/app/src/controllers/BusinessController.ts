import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BusinessRepository from '../repositories/BusinessRepository';

class BusinessController {
    constructor() {}
    
    create = async (req: Request, res: Response) => {
        try {
            const { business } = req.body;

            await BusinessRepository.create(business);

            return res.status(StatusCodes.CREATED).send();
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'BUS500C',
                message: error?.message ?? 'No message'
            })
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.empresa;
            const { business } = req.body;

            if (!id) {
                throw new Error('Ocorreu um erro ao recuperar informações da empresa');
            }

            const updatedBusiness = await BusinessRepository.update(id, business);

            return res.status(StatusCodes.OK).json({ updatedBusiness });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'BUS500U',
                message: error?.message ?? 'No message'
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.body;

            if (!id) {
                throw new Error('Você precisa fornecer o ID da empresa a ser removida');
            }

            const deleted = await BusinessRepository.delete(id);

            if (!deleted) {
                throw new Error('Ocorreu um erro ao deletar a empresa');
            }

            return res.status(StatusCodes.GONE).json({ deleted });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'BUS500D',
                message: error?.message ?? 'No message'
            })
        }
    }
}

export default new BusinessController();