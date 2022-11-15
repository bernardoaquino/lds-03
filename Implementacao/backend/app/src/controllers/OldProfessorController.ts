import { professorRepository } from './../repositories/professorRepository';
import { departamentoRepository } from './../repositories/departamentoRepository';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../helpers/api-erros';
import bcrypt from 'bcrypt'

export class ProfessorController {
    async create(req: Request, res: Response) {        
        const { nome, email, senha, cpf, id_departamento} = req.body

        const professorExists = await professorRepository.findOneBy({ email })

        if(professorExists) {
            throw new BadRequestError('E-mail já existe')
        }

        const departamento = await departamentoRepository.findOneBy({ id: Number(id_departamento) })

        if(!departamento) {
            throw new NotFoundError('Departamento inexistente!');
        }

        const hashSenha = await bcrypt.hash(senha, 10)

        const newProfessor = professorRepository.create({
            nome,
            email, 
            senha: hashSenha, 
            cpf,
            departamento
        });

        await professorRepository.save(newProfessor);

        const { senha: _,  ...professor} = newProfessor;

        return res.status(StatusCodes.CREATED).json(professor);
    }

    async list(req: Request, res: Response) {
        const professores = await professorRepository.find({
            relations: ['transacoes', 'transacoes.aluno'],
        });

        return res.json(professores);
    }

    async listOne(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const professor = await professorRepository.findOne({
            where: { id: Number(id) },
            relations: ['transacoes', 'transacoes.aluno'],
        });

        if(!professor) {
            throw new NotFoundError('Professor inexistente!');
        }

        return res.json(professor);
    }

    async getProfile(req: Request, res: Response) {
        const id = req.professor.id;
        const professor = await professorRepository.findOne({
            where: { id: Number(id) },
            relations: ['transacoes', 'transacoes.aluno'],
        });

        if(!professor) {
            throw new NotFoundError('Professor inexistente!');
        }

        return res.json(professor);
    }

    async delete(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const professor = await professorRepository.findOneBy({ id: Number(id) });

        if(!professor) {
            throw new NotFoundError('Professor inexistente!');
        }

        await professorRepository.delete(professor);

        return res.status(StatusCodes.OK).json(professor);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const id = Number(req.professor.id);
        const { nome, email, senha, cpf, id_departamento} = req.body

        const professor = await professorRepository.findOneBy({ id: Number(id) });

        if(!professor) {
            throw new BadRequestError('Professor inexistente!')
        }

        if (id_departamento !== req?.professor?.departamento?.id) {
            const departamento = await departamentoRepository.findOneBy({ id: Number(id_departamento) })

            if(!departamento) {
                throw new NotFoundError('Departamento inexistente!');
            }

            professor.departamento = departamento;
        }

        if (senha !== req.professor.senha) {
            professor.senha = await bcrypt.hash(senha, 10);
        }

        professor.nome = nome ?? professor.nome;
        professor.email = email ?? professor.email;
        professor.cpf = cpf ?? professor.cpf;

        await professorRepository.update(id, professor);

        return res.status(StatusCodes.OK).json(professor);
    }
}