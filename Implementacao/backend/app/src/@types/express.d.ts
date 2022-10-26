import { InstituicaoDeEnsino } from './../models/InstituicaoDeEnsino';

declare global {
	namespace Express {
		export interface Request {
			instituicaoDeEnsino: Partial<InstituicaoDeEnsino>
		}
	}
}