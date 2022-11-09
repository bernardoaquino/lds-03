import { instituicaoDeEnsinoRepository } from './../repositories/instituicaoDeEnsinoRepository';
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros'
import jwt from 'jsonwebtoken'
import { empresaRepository } from '../repositories/empresaRepository';
import { alunoRepository } from '../repositories/alunoRepository';
import { professorRepository } from '../repositories/professorRepository';

type JwtPayload = {
	id: number
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new UnauthorizedError('Não autorizado')
	}

	const token = authorization.split(' ')[1]

	const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

	let user

	//Login - Instituição De Ensino
	const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ id })

	if (!!instituicaoDeEnsino) {
		user = instituicaoDeEnsino

		const { senha: _, ...logedUser } = user
		req.instituicaoDeEnsino = logedUser
	}

	//Login - Empresa
	const empresa = await empresaRepository.findOneBy({ id })

	if (!!empresa) {
		user = empresa

		const { senha: _, ...logedUser } = user
		req.empresa = logedUser
	}

	//Login - Aluno
	const aluno = await alunoRepository.findOneBy({ id })

	if (!!aluno) {
		user = aluno

		const { senha: _, ...logedUser } = user
		req.aluno = logedUser
	}

	//Login - Professor
	const professor = await professorRepository.findOneBy({ id })

	if (!!professor) {
		user = professor

		const { senha: _, ...logedUser } = user
		req.professor = logedUser
	}

	if (!user) {
		throw new UnauthorizedError('Não autorizado')
	}

	next()
}