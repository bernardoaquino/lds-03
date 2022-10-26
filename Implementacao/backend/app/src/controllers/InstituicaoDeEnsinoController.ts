import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from './../helpers/api-erros';
import { instituicaoDeEnsinoRepository } from './../repositories/instituicaoDeEnsinoRepository';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'

export class InstituicaoDeEnsinoController {
    async create(req: Request, res: Response) {
        const { email, nome, senha } = req.body

        const instituicaoExists = await instituicaoDeEnsinoRepository.findOneBy({ email })

        if(instituicaoExists) {
            throw new BadRequestError('E-mail já existe')
        }

        const hashSenha = await bcrypt.hash(senha, 10)

        const newInstituicaoDeEnsino = instituicaoDeEnsinoRepository.create({
            nome, 
            email, 
            senha: hashSenha
        })

        await instituicaoDeEnsinoRepository.save(newInstituicaoDeEnsino);

        const { senha: _,  ...instituicaoDeEnsino} = newInstituicaoDeEnsino;

        return res.status(StatusCodes.CREATED).json(instituicaoDeEnsino);
    }

    async list(req: Request, res: Response) {
        const instituicoes = await instituicaoDeEnsinoRepository.find();
        // const instituicoes = await instituicaoDeEnsinoRepository.find({
        //     relations: {
        //         alunos: true,
        //         cursos: true
        //     }
        // });

        return res.json(instituicoes);
    }

    async listOne(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id) });

        if(!instituicaoDeEnsino) {
            throw new NotFoundError('Instituicao inexistente!');
        }

        return res.json(instituicaoDeEnsino);
    }

    async destroy(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const instituicao = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id) });

        if(!instituicao) {
            throw new NotFoundError('Instituicao inexistente!');
        }

        await instituicaoDeEnsinoRepository.delete(instituicao);

        return res.status(StatusCodes.OK).json(instituicao);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const { email, nome, senha } = req.body

        const instituicao = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id) });

        if(!instituicao) {
            throw new NotFoundError('Instituicao inexistente!');
        }

        instituicao.email = email;
        instituicao.nome = nome;
        instituicao.senha = await bcrypt.hash(senha, 10);

        await instituicaoDeEnsinoRepository.update(id, instituicao);

        return res.status(StatusCodes.OK).json(instituicao);
    }
}