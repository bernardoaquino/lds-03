import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import bcrypt from 'bcrypt'
import { NotFoundError } from '../helpers/api-erros';
import { Professor } from '../models/Professor';
import { Departamento } from '../models/Departamento';

export class ProfessorSeeder implements Seeder {
    async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		const ProfessorRepository = dataSource.getRepository(Professor)

		const departamentoRepository = dataSource.getRepository(Departamento)
		const departamento = await departamentoRepository.findOneBy({ nome: "departamento" })

		if(!departamento) {
            throw new NotFoundError('Departamento inexistente!');
        }

		const professorData = {
			nome: 'professor',
			email: 'professor@gmail.com',
			senha: await bcrypt.hash('professor', 10),
			cpf: '12312312312',
			qtdeMoedas: 1000,
			departamento: departamento,
		}

		const professorExists = await ProfessorRepository.findOneBy({ email: professorData.email })

		if (!professorExists) {
			const newProfessor = ProfessorRepository.create(professorData)
			await ProfessorRepository.save(newProfessor)
		}
	}
}