import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { InstituicaoDeEnsino } from '../models/InstituicaoDeEnsino';
import bcrypt from 'bcrypt'

export class InstituicaoDeEnsinoSeeder implements Seeder {
    async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		const instituicaoDeEnsinoRepository = dataSource.getRepository(InstituicaoDeEnsino)

		const instituicaoData = {
			nome: 'admin',
			email: 'admin@gmail.com',
			senha: await bcrypt.hash('admin', 10),
		}

		const instituicaoExists = await instituicaoDeEnsinoRepository.findOneBy({ email: instituicaoData.email })

		if (!instituicaoExists) {
			const newInstituicao = instituicaoDeEnsinoRepository.create(instituicaoData)
			await instituicaoDeEnsinoRepository.save(newInstituicao)
		}
	}
}