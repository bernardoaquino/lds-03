import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668477363826 implements MigrationInterface {
    name = 'default1668477363826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cursos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`instituicaoDeEnsinoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departamentos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`instituicaoDeEnsinoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`professores\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`email\` text NOT NULL, \`senha\` text NOT NULL, \`cpf\` text NOT NULL, \`qtdeMoedas\` int NOT NULL DEFAULT '0', \`departamentoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transacoes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`motivo\` text NOT NULL, \`valor\` double NOT NULL, \`professorId\` int NULL, \`alunoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`alunos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`email\` text NOT NULL, \`senha\` text NOT NULL, \`cpf\` text NOT NULL, \`rg\` text NOT NULL, \`endereco\` text NOT NULL, \`qtdeMoedas\` int NOT NULL DEFAULT '0', \`cursoId\` int NULL, \`instituicaoDeEnsinoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`instituicoes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` text NOT NULL, \`nome\` text NOT NULL, \`senha\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`empresas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`email\` text NOT NULL, \`senha\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vantagem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`descricao\` text NOT NULL, \`fotoProdutoUrl\` text NOT NULL, \`custoMoedas\` int NOT NULL DEFAULT '0', \`empresaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`alunoHasVantagem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cupomGerado\` text NOT NULL, \`alunoId\` int NULL, \`vantagemId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cursos\` ADD CONSTRAINT \`FK_91233ce054ad567becc0f696edb\` FOREIGN KEY (\`instituicaoDeEnsinoId\`) REFERENCES \`instituicoes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`departamentos\` ADD CONSTRAINT \`FK_137d8453438eb35598c639a9226\` FOREIGN KEY (\`instituicaoDeEnsinoId\`) REFERENCES \`instituicoes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`professores\` ADD CONSTRAINT \`FK_9ed42446c4f62b68d103e1de9c7\` FOREIGN KEY (\`departamentoId\`) REFERENCES \`departamentos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transacoes\` ADD CONSTRAINT \`FK_9f65569ae406cdc4995f4efe5b7\` FOREIGN KEY (\`professorId\`) REFERENCES \`professores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transacoes\` ADD CONSTRAINT \`FK_d85d05b33c8ab70bec5e62c716e\` FOREIGN KEY (\`alunoId\`) REFERENCES \`alunos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD CONSTRAINT \`FK_6b7f554c026899f4dc9ca46559e\` FOREIGN KEY (\`cursoId\`) REFERENCES \`cursos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD CONSTRAINT \`FK_9e821a1a1df94f3178bb4c2aca3\` FOREIGN KEY (\`instituicaoDeEnsinoId\`) REFERENCES \`instituicoes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vantagem\` ADD CONSTRAINT \`FK_d82a7a0d4fef50245877120f074\` FOREIGN KEY (\`empresaId\`) REFERENCES \`empresas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`alunoHasVantagem\` ADD CONSTRAINT \`FK_541990a7293d447c7ceb9d83314\` FOREIGN KEY (\`alunoId\`) REFERENCES \`alunos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`alunoHasVantagem\` ADD CONSTRAINT \`FK_c9ddfd48de6330668dce2647505\` FOREIGN KEY (\`vantagemId\`) REFERENCES \`vantagem\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alunoHasVantagem\` DROP FOREIGN KEY \`FK_c9ddfd48de6330668dce2647505\``);
        await queryRunner.query(`ALTER TABLE \`alunoHasVantagem\` DROP FOREIGN KEY \`FK_541990a7293d447c7ceb9d83314\``);
        await queryRunner.query(`ALTER TABLE \`vantagem\` DROP FOREIGN KEY \`FK_d82a7a0d4fef50245877120f074\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP FOREIGN KEY \`FK_9e821a1a1df94f3178bb4c2aca3\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP FOREIGN KEY \`FK_6b7f554c026899f4dc9ca46559e\``);
        await queryRunner.query(`ALTER TABLE \`transacoes\` DROP FOREIGN KEY \`FK_d85d05b33c8ab70bec5e62c716e\``);
        await queryRunner.query(`ALTER TABLE \`transacoes\` DROP FOREIGN KEY \`FK_9f65569ae406cdc4995f4efe5b7\``);
        await queryRunner.query(`ALTER TABLE \`professores\` DROP FOREIGN KEY \`FK_9ed42446c4f62b68d103e1de9c7\``);
        await queryRunner.query(`ALTER TABLE \`departamentos\` DROP FOREIGN KEY \`FK_137d8453438eb35598c639a9226\``);
        await queryRunner.query(`ALTER TABLE \`cursos\` DROP FOREIGN KEY \`FK_91233ce054ad567becc0f696edb\``);
        await queryRunner.query(`DROP TABLE \`alunoHasVantagem\``);
        await queryRunner.query(`DROP TABLE \`vantagem\``);
        await queryRunner.query(`DROP TABLE \`empresas\``);
        await queryRunner.query(`DROP TABLE \`instituicoes\``);
        await queryRunner.query(`DROP TABLE \`alunos\``);
        await queryRunner.query(`DROP TABLE \`transacoes\``);
        await queryRunner.query(`DROP TABLE \`professores\``);
        await queryRunner.query(`DROP TABLE \`departamentos\``);
        await queryRunner.query(`DROP TABLE \`cursos\``);
    }

}
