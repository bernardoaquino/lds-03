import { Professor } from './../models/Professor';

import { AppDataSource } from '../data-source';

export const professorRepository = AppDataSource.getRepository(Professor)