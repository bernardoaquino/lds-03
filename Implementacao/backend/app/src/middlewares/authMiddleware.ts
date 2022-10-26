import { instituicaoDeEnsinoRepository } from './../repositories/instituicaoDeEnsinoRepository';
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros'
import jwt from 'jsonwebtoken'
import { empresaRepository } from '../repositories/empresaRepository';
import { alunoRepository } from '../repositories/alunoRepository';

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

	let user;

	const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ id })

	if (!!instituicaoDeEnsino) {
		user = instituicaoDeEnsino
	}

	const empresa = await empresaRepository.findOneBy({ id })

	if (!!empresa) {
		user = empresa
	}

	const aluno = await alunoRepository.findOneBy({ id })

	if (!!aluno) {
		user = aluno
	}

	if (!user) {
		throw new UnauthorizedError('Não autorizado')
	}

	const { senha: _, ...logedUser } = user

	req.user = logedUser
	req.id = user.id

	next()
}