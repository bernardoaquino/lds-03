import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../helpers/api-erros';
import { instituicaoDeEnsinoRepository } from '../repositories/instituicaoDeEnsinoRepository';

export class AuthController {
    async login(req: Request, res: Response) {
        const { email, senha } = req.body

        //Por enquanto só login com instituição, futuramente login com professor e aluno (diferentes permissões para cada tipo de login?)
        const instituicao = await instituicaoDeEnsinoRepository.findOneBy({ email })

        if(!instituicao) {
            throw new BadRequestError('E-mail ou senha inválidos')
        }

        const verifySenha = await bcrypt.compare(senha, instituicao.senha);
        if (!verifySenha) {
            throw new BadRequestError('E-mail ou senha inválidos')
        }

        const token = jwt.sign({ id: instituicao.id }, process.env.JWT_PASS ?? '', { 
            expiresIn: '365d' 
        });

        const { senha: _, ...instituicaoLogin } = instituicao;

        return res.json({
            user: instituicaoLogin,
            token: token
        })
    }
}