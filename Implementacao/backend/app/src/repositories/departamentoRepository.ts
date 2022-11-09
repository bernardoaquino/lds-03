import { Departamento } from './../models/Departamento';
import { AppDataSource } from '../data-source';

export const departamentoRepository = AppDataSource.getRepository(Departamento)