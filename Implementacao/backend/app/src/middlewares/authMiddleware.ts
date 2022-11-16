import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

/** Error Types */
import { UnauthorizedError } from '../helpers/api-erros'

/** Repositories */
import InstituteRepository from '../repositories/InstituteRepository';
import BusinessRepository from '../repositories/BusinessRepository';
import StudentRepository from '../repositories/StudentRepository';
import ProfessorRepository from '../repositories/ProfessorRepository';

type JwtPayload = {
	id: number;
	email: string;
}

const validateAndSetReq = async (varName: ('instituicaoDeEnsino' | 'empresa' | 'aluno' | 'professor') , id: number, email: string, req: Request, getUserByCredentials: Function) => {
	const user = await getUserByCredentials(id, email);

	if (!!user) {
		const { senha: _, userData } = user;

		req[varName] = userData;
	}
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new UnauthorizedError('Não autorizado');
	}

	const token = authorization.split(' ')[1];

	const { id, email } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

	validateAndSetReq('instituicaoDeEnsino', id, email, req, InstituteRepository.getByCredentials);
	validateAndSetReq('empresa', id, email, req, BusinessRepository.getByCredentials);
	validateAndSetReq('aluno', id, email, req, StudentRepository.getByCredentials);
	validateAndSetReq('professor', id, email, req, ProfessorRepository.getByCredentials);

	if (!req?.instituicaoDeEnsino && !req?.empresa && !req?.aluno && !req?.professor) {
		throw new UnauthorizedError('Não autorizado');
	}

	next();
}