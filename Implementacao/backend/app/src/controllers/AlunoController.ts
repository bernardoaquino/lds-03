import { UnauthorizedError } from './../helpers/api-erros';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../helpers/api-erros';
import { alunoRepository } from '../repositories/alunoRepository';
import { cursoRepository } from '../repositories/cursoRepository';
import { instituicaoDeEnsinoRepository } from '../repositories/instituicaoDeEnsinoRepository';
import bcrypt from 'bcrypt'

export class AlunoController {
    async create(req: Request, res: Response) {        
        const { nome, email, senha, cpf, rg, endereco, id_curso, id_instituicao } = req.body

        const alunoExists = await alunoRepository.findOneBy({ email })

        if(alunoExists) {
            throw new BadRequestError('E-mail já existe')
        }

        // const curso = await cursoRepository.findOneBy({ id: Number(id_curso) })
        // const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id_instituicao) })

        // if(!curso) {
        //     throw new NotFoundError('Curso inexistente!');
        // }else if(!instituicaoDeEnsino) {
        //     throw new NotFoundError('Instituição inexistente!');
        // }

        const hashSenha = await bcrypt.hash(senha, 10)

        const newAluno = alunoRepository.create({
            nome,
            email, 
            senha: hashSenha, 
            cpf,
            rg,
            endereco,
            // curso,
            // instituicaoDeEnsino,
        });

        await alunoRepository.save(newAluno);

        const { senha: _,  ...aluno} = newAluno;

        return res.status(StatusCodes.CREATED).json(aluno);
    }

    async list(req: Request, res: Response) {
        const alunos = await alunoRepository.find();

        return res.json(alunos);
    }

    async listOne(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const aluno = await alunoRepository.findOneBy({ id: Number(id) });

        if(!aluno) {
            throw new NotFoundError('Aluno inexistente!');
        }

        return res.json(aluno);
    }

    async getProfile(req: Request<{ id: string }>, res: Response) {
        const id = req.id;
        const aluno = await alunoRepository.findOneBy({ id: Number(id) });

        if(!aluno) {
            throw new NotFoundError('Aluno inexistente!');
        }

        return res.json(aluno);
    }

    async destroy(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const aluno = await alunoRepository.findOneBy({ id: Number(id) });

        if(!aluno) {
            throw new NotFoundError('Aluno inexistente!');
        }

        await alunoRepository.delete(aluno);

        return res.status(StatusCodes.OK).json(aluno);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const { nome, email, senha, cpf, rg, endereco, id_curso, id_instituicao, qtde_moedas } = req.body

        const aluno = await alunoRepository.findOneBy({ rg: id });

        if(!aluno) {
            throw new NotFoundError('Aluno inexistente!');
        }

        // const instituicao = await instituicaoDeEnsinoRepository.findOneBy({ id: Number(id_instituicao) });

        // if(!instituicao) {
        //     throw new NotFoundError('Instituicao inexistente!');
        // }

        // const curso = await cursoRepository.findOneBy({ id: Number(id_curso) });

        // if(!curso) {
        //     throw new NotFoundError('Curso inexistente!');
        // }

        aluno.nome = nome;
        aluno.email = email;
        aluno.senha = await bcrypt.hash(senha, 10);
        aluno.cpf = cpf;
        aluno.rg = rg;
        aluno.endereco = endereco;
        aluno.qtdeMoedas = qtde_moedas;
        // aluno.instituicaoDeEnsino = instituicao;
        // aluno.curso = curso;

        await alunoRepository.update(id, aluno);

        return res.status(StatusCodes.OK).json(aluno);
    }
}