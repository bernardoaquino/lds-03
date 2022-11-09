import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Aluno } from '../models/Aluno';
import bcrypt from 'bcrypt'
import { InstituicaoDeEnsino } from '../models/InstituicaoDeEnsino';
import { Curso } from '../models/Curso';
import { NotFoundError } from '../helpers/api-erros';

export class AlunoSeeder implements Seeder {
    async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		const AlunoRepository = dataSource.getRepository(Aluno)

		const instituicaoDeEnsinoRepository = dataSource.getRepository(InstituicaoDeEnsino)
		const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ email: "admin@gmail.com" })

		if(!instituicaoDeEnsino) {
            throw new NotFoundError('Instituição inexistente!');
        }

		const CursoRepository = dataSource.getRepository(Curso)
		const curso = await CursoRepository.findOneBy({ nome: "curso" })

		if(!curso) {
            throw new NotFoundError('Curso inexistente!');
        }

		const alunoData = {
			nome: 'aluno',
			email: 'aluno@gmail.com',
			senha: await bcrypt.hash('aluno', 10),
			cpf: '12312312312',
			rg: '12345678',
			endereco: 'Rua X',
			instituicaoDeEnsino: instituicaoDeEnsino,
			curso: curso
		}

		const alunoExists = await AlunoRepository.findOneBy({ email: alunoData.email })

		if (!alunoExists) {
			const newAluno = AlunoRepository.create(alunoData)
			await AlunoRepository.save(newAluno)
		}
	}
}