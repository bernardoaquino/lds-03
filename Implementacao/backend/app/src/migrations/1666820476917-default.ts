import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666820476917 implements MigrationInterface {
    name = 'default1666820476917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cursos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`instituicaoDeEnsinoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`alunos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`email\` text NOT NULL, \`senha\` text NOT NULL, \`cpf\` text NOT NULL, \`rg\` text NOT NULL, \`endereco\` text NOT NULL, \`qtdeMoedas\` int NOT NULL DEFAULT '0', \`cursoId\` int NULL, \`instituicaoDeEnsinoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`instituicoes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` text NOT NULL, \`nome\` text NOT NULL, \`senha\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`empresas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`email\` text NOT NULL, \`senha\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cursos\` ADD CONSTRAINT \`FK_91233ce054ad567becc0f696edb\` FOREIGN KEY (\`instituicaoDeEnsinoId\`) REFERENCES \`instituicoes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD CONSTRAINT \`FK_6b7f554c026899f4dc9ca46559e\` FOREIGN KEY (\`cursoId\`) REFERENCES \`cursos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD CONSTRAINT \`FK_9e821a1a1df94f3178bb4c2aca3\` FOREIGN KEY (\`instituicaoDeEnsinoId\`) REFERENCES \`instituicoes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP FOREIGN KEY \`FK_9e821a1a1df94f3178bb4c2aca3\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP FOREIGN KEY \`FK_6b7f554c026899f4dc9ca46559e\``);
        await queryRunner.query(`ALTER TABLE \`cursos\` DROP FOREIGN KEY \`FK_91233ce054ad567becc0f696edb\``);
        await queryRunner.query(`DROP TABLE \`empresas\``);
        await queryRunner.query(`DROP TABLE \`instituicoes\``);
        await queryRunner.query(`DROP TABLE \`alunos\``);
        await queryRunner.query(`DROP TABLE \`cursos\``);
    }

}
