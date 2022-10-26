import { Empresa } from './../models/Empresa';

import { AppDataSource } from '../data-source';

export const empresaRepository = AppDataSource.getRepository(Empresa)