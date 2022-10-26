import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../helpers/api-erros';
import { alunoRepository } from '../repositories/alunoRepository';
import { empresaRepository } from '../repositories/empresaRepository';

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

        const aluno = await alunoRepository.findOneBy({ email })
        
        //Por enquanto só login com instituição, futuramente login com professor e aluno (diferentes permissões para cada tipo de login?)
        if (aluno) {
            const token = await validatePassword(aluno.id, senha, aluno)
    
            const { senha: _, ...alunoLogin } = aluno;
    
            return res.json({
                user: alunoLogin,
                userType: 'student',
                token: token
            })         
        }

        const empresa = await empresaRepository.findOneBy({ email })

        if(empresa) {
            const token = await validatePassword(empresa.id, senha, empresa)

            console.log(token, empresa)
    
            const { senha: _, ...empresaLogin } = empresa;
    
            return res.json({
                user: empresaLogin,
                userType: 'business',
                token: token
            })
        }
        
        throw new BadRequestError('E-mail ou senha inválidos')
    }
}