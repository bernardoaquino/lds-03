import { Aluno } from '../models/Aluno';
import { Empresa } from '../models/Empresa';
import { Professor } from '../models/Professor';
import { InstituicaoDeEnsino } from './../models/InstituicaoDeEnsino';

declare global {
	namespace Express {
		export interface Request {
			instituicaoDeEnsino: Partial<InstituicaoDeEnsino>
			empresa: Partial<Empresa>
			aluno: Partial<Aluno>
			professor: Partial<Professor>
		}
	}
}