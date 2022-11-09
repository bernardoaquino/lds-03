import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import bcrypt from 'bcrypt'
import { NotFoundError } from '../helpers/api-erros';
import { InstituicaoDeEnsino } from '../models/InstituicaoDeEnsino';
import { Departamento } from '../models/Departamento';

export class DepartamentoSeeder implements Seeder {
    async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		const departamentoRepository = dataSource.getRepository(Departamento)

		const instituicaoDeEnsinoRepository = dataSource.getRepository(InstituicaoDeEnsino)
		const instituicaoDeEnsino = await instituicaoDeEnsinoRepository.findOneBy({ email: "admin@gmail.com" })

		if(!instituicaoDeEnsino) {
            throw new NotFoundError('Instituição inexistente!');
        }

		const departamentoData = {
			nome: 'departamento',
			instituicaoDeEnsino: instituicaoDeEnsino
		}

		const departamentoExists = await departamentoRepository.findOneBy({ nome: departamentoData.nome })

		if (!departamentoExists) {
			const newDepartamento = departamentoRepository.create(departamentoData)
			await departamentoRepository.save(newDepartamento)
		}
	}
}