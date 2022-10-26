import { Curso } from './../models/Curso';

import { AppDataSource } from '../data-source';

export const cursoRepository = AppDataSource.getRepository(Curso)