import { instituicaoDeEnsinoRepository } from './../repositories/instituicaoDeEnsinoRepository';
import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros'
import jwt from 'jsonwebtoken'

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

	const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ id })

	if (!instituicaoDeEnsino) {
		throw new UnauthorizedError('Não autorizado')
	}

	const { senha: _, ...loggedInstituicaoDeEnsino } = instituicaoDeEnsino

	req.instituicaoDeEnsino = loggedInstituicaoDeEnsino

	next()
}