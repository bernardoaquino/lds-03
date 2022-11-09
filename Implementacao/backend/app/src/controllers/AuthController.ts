import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../helpers/api-erros';
import { alunoRepository } from '../repositories/alunoRepository';
import { empresaRepository } from '../repositories/empresaRepository';
import { instituicaoDeEnsinoRepository } from '../repositories/instituicaoDeEnsinoRepository';
import { professorRepository } from '../repositories/professorRepository';

export class AuthController {
    async login(req: Request, res: Response) {
        const { email, senha } = req.body

        const validatePassword = async (id: any, password: string, user: any): Promise<string> => {
            const verifySenha = await bcrypt.compare(password, user.senha);
            
            if (!verifySenha) {
                throw new BadRequestError('E-mail ou senha inválidos')
            }
    
            const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { 
                expiresIn: '365d' 
            })
    
            return token;
        }
    
        //Login - Aluno
        const aluno = await alunoRepository.findOneBy({ email })

        if (aluno) {
            const token = await validatePassword(aluno.id, senha, aluno)
    
            const { senha: _, ...alunoLogin } = aluno;
    
            return res.json({
                user: alunoLogin,
                userType: 'student',
                token: token
            })         
        }

        //Login - Empresa
        const empresa = await empresaRepository.findOneBy({ email })

        if(empresa) {
            const token = await validatePassword(empresa.id, senha, empresa)
    
            const { senha: _, ...empresaLogin } = empresa;
    
            return res.json({
                user: empresaLogin,
                userType: 'business',
                token: token
            })
        }

        //Login - Instituição De Ensino
        const instituicao = await instituicaoDeEnsinoRepository.findOneBy({ email })

        if(instituicao) {
            const token = await validatePassword(instituicao.id, senha, instituicao)
    
            const { senha: _, ...instituicaoLogin } = instituicao;
    
            return res.json({
                user: instituicaoLogin,
                userType: 'institute',
                token: token
            })
        }

        //Login - Professor
        const professor = await professorRepository.findOneBy({ email })

        if(professor) {
            const token = await validatePassword(professor.id, senha, professor)
    
            const { senha: _, ...professorLogin } = professor;
    
            return res.json({
                user: professorLogin,
                userType: 'professor',
                token: token
            })
        }
        
        throw new BadRequestError('E-mail ou senha inválidos')
    }
}