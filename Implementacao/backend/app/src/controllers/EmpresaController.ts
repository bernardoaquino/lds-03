import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from './../helpers/api-erros';
import { empresaRepository } from './../repositories/empresaRepository';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'

export class EmpresaController {
    async create(req: Request, res: Response) {
        const { nome, email, senha } = req.body

        const empresaExists = await empresaRepository.findOneBy({ email })

        if(empresaExists) {
            throw new BadRequestError('E-mail já existe')
        }

        const hashSenha = await bcrypt.hash(senha, 10)

        const newEmpresa = empresaRepository.create({
            nome, 
            email, 
            senha: hashSenha
        })

        await empresaRepository.save(newEmpresa);

        const { senha: _,  ...empresa} = newEmpresa;

        return res.status(StatusCodes.CREATED).json(empresa);
    }

    async list(req: Request, res: Response) {
        const empresas = await empresaRepository.find();

        return res.json(empresas);
    }

    async listOne(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const empresa = await empresaRepository.findOneBy({ id: Number(id) });

        if(!empresa) {
            throw new NotFoundError('Empresa inexistente!');
        }

        return res.json(empresa);
    }

    async destroy(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const empresa = await empresaRepository.findOneBy({ id: Number(id) });

        if(!empresa) {
            throw new NotFoundError('Empresa inexistente!');
        }

        await empresaRepository.delete(empresa);

        return res.status(StatusCodes.OK).json(empresa);
    }

    async update(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const { nome, email, senha } = req.body

        const empresa = await empresaRepository.findOneBy({ id: Number(id) });

        if(!empresa) {
            throw new NotFoundError('Empresa inexistente!');
        }

        empresa.nome = nome;
        empresa.email = email;
        empresa.senha = await bcrypt.hash(senha, 10);

        await empresaRepository.update(id, empresa);

        return res.status(StatusCodes.OK).json(empresa);
    }
}