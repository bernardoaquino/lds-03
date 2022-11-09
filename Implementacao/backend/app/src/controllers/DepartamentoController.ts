import { departamentoRepository } from './../repositories/departamentoRepository';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from './../helpers/api-erros';
import { instituicaoDeEnsinoRepository } from './../repositories/instituicaoDeEnsinoRepository';
import { Request, Response } from 'express';

export class DepartamentoController {
    async create(req: Request, res: Response) {
        const { nome, id_instituicao } = req.body

        const departamentoExists = await departamentoRepository.findOneBy({ nome })

        if(departamentoExists) {
            throw new BadRequestError('Nome já existe')
        }

        const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id_instituicao) })

        if(!instituicaoDeEnsino) {
            throw new NotFoundError('Instituição inexistente!');
        }

        const newDepartamento = departamentoRepository.create({ 
            nome, 
            instituicaoDeEnsino
        })

        await departamentoRepository.save(newDepartamento);

        return res.status(StatusCodes.CREATED).json(newDepartamento);
    }

    async list(req: Request, res: Response) {
        const departamentos = await departamentoRepository.find({
            relations: {
                professores: true
            }
        });

        return res.json(departamentos);
    }

    async listByInstituicao(req: Request<{ id: string }>, res: Response) {
        const id_instituicao = req.params.id

        const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id_instituicao) })

        if(!instituicaoDeEnsino) {
            throw new NotFoundError('Instituição inexistente!');
        }

        const departamentos = await departamentoRepository.findBy({
            instituicaoDeEnsino
        })

        return res.json(departamentos)
    }

    async listOne(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const departamento = await departamentoRepository.findOne({
            where: { id: Number(id) },
            relations: ['professores', 'instituicaoDeEnsino'],
        });

        if(!departamento) {
            throw new NotFoundError('Departamento inexistente!');
        }

        return res.json(departamento);
    }

    async destroy(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const departamento = await departamentoRepository.findOneBy({ id: Number(id) });

        if(!departamento) {
            throw new NotFoundError('Departamento inexistente!');
        }

        await departamentoRepository.delete(departamento);

        return res.status(StatusCodes.OK).json(departamento);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const { nome, id_instituicao } = req.body

        const departamento = await departamentoRepository.findOneBy({ id: Number(id) });

        if(!departamento) {
            throw new NotFoundError('Departamento inexistente!');
        }

        const instituicao = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id_instituicao) });

        if(!instituicao) {
            throw new NotFoundError('Instituicao inexistente!');
        }

        departamento.nome = nome;
        departamento.instituicaoDeEnsino = instituicao;

        await departamentoRepository.update(id, departamento);

        return res.status(StatusCodes.OK).json(departamento);
    }
}