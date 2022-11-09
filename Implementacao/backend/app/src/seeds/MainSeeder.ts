import { DepartamentoSeeder } from './DepartamentoSeeder';
import { ProfessorSeeder } from './ProfessorSeeder';
import { DataSource } from 'typeorm'
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension'
import { InstituicaoDeEnsinoSeeder } from './InstituicaoDeEnsinoSeeder'
import { CursoSeeder } from './CursoSeeder';
import { EmpresaSeeder } from './EmpresaSeeder';
import { AlunoSeeder } from './AlunoSeeder';

export class MainSeeder implements Seeder {
	async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<void> {
		await runSeeder(dataSource, InstituicaoDeEnsinoSeeder)
		await runSeeder(dataSource, EmpresaSeeder)
		await runSeeder(dataSource, CursoSeeder)
		await runSeeder(dataSource, DepartamentoSeeder)
		await runSeeder(dataSource, ProfessorSeeder)
		await runSeeder(dataSource, AlunoSeeder)
	}
}