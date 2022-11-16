import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import InstituteRepository from '../repositories/InstituteRepository';

class CourseController {
    constructor() {}

    listAll = async (req: Request, res: Response) => {
        try {
            const { id: institutionIdStr } = req.params;
            const institutionId = Number(institutionIdStr);

            const courses = await InstituteRepository.getCoursesByInstitutionId(institutionId);

            return res.status(StatusCodes.OK).json({ courses })
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'CRS500L',
                message: error?.message ?? 'No message'
            })
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const { id } = req.instituicaoDeEnsino;
            const { course } = req.body;

            if (!id) {
                throw new Error('Você precisa ser uma instituição autenticada para realizar essa operação');
            }

            const institution = await InstituteRepository.getById(id);

            if (!institution) {
                throw new Error('Instituição não encontrada');
            }

            const createdCourse = await InstituteRepository.addCourse(institution, course);

            return res.status(StatusCodes.CREATED).json({ createdCourse });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'CRS500C',
                message: error?.message ?? 'No message'
            })
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.instituicaoDeEnsino;
            const { id: courseId } = req.params;
            const { course } = req.body;

            if (!courseId || Number.isNaN(courseId)) {
                throw new Error('Você precisa informar qual departamento será atualizado');
            }

            if (!id) {
                throw new Error('Você precisa ser uma instituição autenticada para realizar essa operação');
            }

            const institution = await InstituteRepository.getById(id);

            if (!institution) {
                throw new Error('Instituição não encontrada');
            }

            const courseIdNum = Number(courseId);

            const courseToBeUpdated = await InstituteRepository.getCourseById(courseIdNum);

            if (courseToBeUpdated?.instituicaoDeEnsino?.id !== institution?.id) {
                throw new Error('Curso não pertence a instituição de ensino informada');
            }

            const updatedCourse = await InstituteRepository.updateCourse(courseIdNum, course);

            return res.status(StatusCodes.OK).json({ updatedCourse });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'CRS500U',
                message: error?.message ?? 'No message'
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id: institutionId } = req.instituicaoDeEnsino;
            const { id } = req.params;
            const courseId = Number(id);

            if (!id) {
                throw new Error('Você precisa fornecer o ID do curso a ser removido');
            }

            const course = await InstituteRepository.getCourseById(courseId);

            if (course?.instituicaoDeEnsino.id !== institutionId) {
                throw new Error('O curso selecionado não pertence a essa instituição');
            }

            const deleted = await InstituteRepository.deleteCourse(courseId);

            if (!deleted) {
                throw new Error('Ocorreu um erro ao deletar o curso');
            }

            return res.status(StatusCodes.GONE).json({ deleted });
        } catch (error: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'CRS500D',
                message: error?.message ?? 'No message'
            })
        }
    }
}

export default new CourseController();