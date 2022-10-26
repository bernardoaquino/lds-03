import { InstituicaoDeEnsino } from '../models/InstituicaoDeEnsino';

import { AppDataSource } from '../data-source';

export const instituicaoDeEnsinoRepository = AppDataSource.getRepository(InstituicaoDeEnsino)