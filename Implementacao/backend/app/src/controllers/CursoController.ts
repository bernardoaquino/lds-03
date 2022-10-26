import { cursoRepository } from './../repositories/cursoRepository';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from './../helpers/api-erros';
import { instituicaoDeEnsinoRepository } from './../repositories/instituicaoDeEnsinoRepository';
import { Request, Response } from 'express';

export class CursoController {
    async create(req: Request, res: Response) {
        const { nome, id_instituicao } = req.body

        const cursoExists = await cursoRepository.findOneBy({ nome })

        if(cursoExists) {
            throw new BadRequestError('Nome já existe')
        }

        const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id_instituicao) })

        if(!instituicaoDeEnsino) {
            throw new NotFoundError('Instituição inexistente!');
        }

        const newCurso = cursoRepository.create({ 
            nome, 
            instituicaoDeEnsino
        })

        await cursoRepository.save(newCurso);

        return res.status(StatusCodes.CREATED).json(newCurso);
    }

    async list(req: Request, res: Response) {
        const cursos = await cursoRepository.find();
        // const cursos = await Response.find({
        //     relations: {
        //         alunos: true
        //     }
        // });

        return res.json(cursos);
    }

    async listOne(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const curso = await cursoRepository.findOneBy({ id: Number(id) });

        if(!curso) {
            throw new NotFoundError('Curso inexistente!');
        }

        return res.json(curso);
    }

    async destroy(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const curso = await cursoRepository.findOneBy({ id: Number(id) });

        if(!curso) {
            throw new NotFoundError('Curso inexistente!');
        }

        await cursoRepository.delete(curso);

        return res.status(StatusCodes.OK).json(curso);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const { nome, id_instituicao } = req.body

        const curso = await cursoRepository.findOneBy({ id: Number(id) });

        if(!curso) {
            throw new NotFoundError('Curso inexistente!');
        }

        const instituicao = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id_instituicao) });

        if(!instituicao) {
            throw new NotFoundError('Instituicao inexistente!');
        }

        curso.nome = nome;
        curso.instituicaoDeEnsino = instituicao;

        await cursoRepository.update(id, curso);

        return res.status(StatusCodes.OK).json(curso);
    }
}