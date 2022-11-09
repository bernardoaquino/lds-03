import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { NotFoundError } from '../helpers/api-erros';
import { Curso } from '../models/Curso';
import { InstituicaoDeEnsino } from '../models/InstituicaoDeEnsino';

export class CursoSeeder implements Seeder {
    async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		const CursoRepository = dataSource.getRepository(Curso)
		
		const instituicaoDeEnsinoRepository = dataSource.getRepository(InstituicaoDeEnsino)
		const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ email: "admin@gmail.com" })

		if(!instituicaoDeEnsino) {
            throw new NotFoundError('Instituição inexistente!');
        }

		const cursoData = {
			nome: 'curso',
			instituicaoDeEnsino: instituicaoDeEnsino
		}

		const cursoExists = await CursoRepository.findOneBy({ nome: cursoData.nome })

		if (!cursoExists) {
			const newCurso = CursoRepository.create(cursoData)
			await CursoRepository.save(newCurso)
		}
	}
}