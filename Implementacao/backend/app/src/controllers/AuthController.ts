import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../helpers/api-erros';

/** Repositories */
import BusinessRepository from '../repositories/BusinessRepository';
import InstituteRepository from '../repositories/InstituteRepository';
import ProfessorRepository from '../repositories/ProfessorRepository';
import StudentRepository from '../repositories/StudentRepository';

export class AuthController {
    private validatePassword = async (password: string, user: any, type: string): Promise<string> => {
        const verifySenha = await bcrypt.compare(password, user.senha);
        
        if (!verifySenha) {
            throw new BadRequestError('E-mail ou senha inválidos')
        }

        const token = jwt.sign({ id: user.id, email: user.email, type }, process.env.JWT_PASS ?? '', { 
            expiresIn: '365d' 
        })

        return token;
    }

    private handleLogin = async (type: string, email: string, senha: string, getByEmail: Function) => {
        const user = await getByEmail(email);


        if (user) {
            const token = await this.validatePassword(senha, user, type);

            const { senha: _, ...userData } = user;

            return {
                user: userData,
                userType: type,
                token: token
            }
        }

        return null;
    }

    login = async (req: Request, res: Response) => {
        const { email, senha } = req.body
   
        const results = await Promise.all([
            this.handleLogin('student', email, senha, StudentRepository.getByEmail),
            this.handleLogin('business', email, senha, BusinessRepository.getByEmail),
            this.handleLogin('institution', email, senha, InstituteRepository.getByEmail),
            this.handleLogin('professor', email, senha, ProfessorRepository.getByEmail)
        ]);

        const responseData = results.find(result => result !== null);

        if (responseData) {
            return res.json(responseData);
        }
        
        throw new BadRequestError('E-mail ou senha inválidos')
    }
}