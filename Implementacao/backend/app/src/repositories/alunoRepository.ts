import { Aluno } from '../models/Aluno';

import { AppDataSource } from '../data-source';

export const alunoRepository = AppDataSource.getRepository(Aluno)