import { Transacao } from './../models/Transacao';
import { AppDataSource } from '../data-source';

export const transacaoRepository = AppDataSource.getRepository(Transacao)