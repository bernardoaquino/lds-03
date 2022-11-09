import { AppDataSource } from '../data-source';
import { Professor } from '../models/Professor';

export const professorRepository = AppDataSource.getRepository(Professor)