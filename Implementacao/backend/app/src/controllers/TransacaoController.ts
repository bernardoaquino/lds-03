import { transacaoRepository } from './../repositories/transacaoRepository';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../helpers/api-erros';
import { Request, Response } from 'express';
import { professorRepository } from '../repositories/professorRepository';
import { alunoRepository } from '../repositories/alunoRepository';

export class TransacaoController {
    async create(req: Request, res: Response) {
        const { motivo, valor, id_aluno } = req.body
        const id = req.professor.id;

        const professor = await professorRepository.findOneBy({ id })

        if(!professor) {
            throw new BadRequestError('Professor inexistente!')
        }

        const aluno = await alunoRepository.findOneBy({ id: Number(id_aluno) })

        if(!aluno) {
            throw new NotFoundError('Aluno inexistente!');
        }

        //Validando saldo
        if(valor > professor.qtdeMoedas) {
            throw new BadRequestError('Saldo insuficiente!')
        }

        //Atualiza saldo professor e aluno
        professor.qtdeMoedas -= valor
        aluno.qtdeMoedas += valor
        await professorRepository.save(professor);
        await alunoRepository.save(aluno);


        const newTransacao = transacaoRepository.create({ 
            motivo, 
            valor,
            professor,
            aluno
        })

        await transacaoRepository.save(newTransacao);

        return res.status(StatusCodes.CREATED).json(newTransacao);
    }

    async list(req: Request, res: Response) {
        const transacoes = await transacaoRepository.find({
            relations: ['professor', 'aluno'],
        });

        return res.json(transacoes);
    }

    async listOne(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        const transacao = await transacaoRepository.findOneBy({ id: Number(id) });

        if(!transacao) {
            throw new NotFoundError('Transação inexistente!');
        }

        return res.json(transacao);
    }
}