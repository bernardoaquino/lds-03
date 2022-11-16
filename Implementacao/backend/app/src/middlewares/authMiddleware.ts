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

const validateAndSetReq = async (id: number, email: string, getUserByCredentials: Function) => {
	const user = await getUserByCredentials(id, email);

	if (!!user) {
		const { senha: _, ...userData } = user;

		return userData;
	}

	return null
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

	req.instituicaoDeEnsino = await validateAndSetReq(id, email, InstituteRepository.getByCredentials);
	req.empresa = await validateAndSetReq(id, email, BusinessRepository.getByCredentials);
	req.aluno = await validateAndSetReq(id, email, StudentRepository.getByCredentials);
	req.professor = await validateAndSetReq(id, email, ProfessorRepository.getByCredentials);

	if (!req?.instituicaoDeEnsino && !req?.empresa && !req?.aluno && !req?.professor) {
		throw new UnauthorizedError('Não autorizado');
	}

	next();
}