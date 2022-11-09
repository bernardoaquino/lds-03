import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Empresa } from '../models/Empresa';
import bcrypt from 'bcrypt'

export class EmpresaSeeder implements Seeder {
    async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		const empresaRepository = dataSource.getRepository(Empresa)

		const empresaData = {
			nome: 'empresa',
			email: 'empresa@gmail.com',
			senha: await bcrypt.hash('empresa', 10),
		}

		const empresaExists = await empresaRepository.findOneBy({ email: empresaData.email })

		if (!empresaExists) {
			const newEmpresa = empresaRepository.create(empresaData)
			await empresaRepository.save(newEmpresa)
		}
	}
}