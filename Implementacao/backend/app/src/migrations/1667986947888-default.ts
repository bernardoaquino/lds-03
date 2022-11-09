import { MigrationInterface, QueryRunner } from "typeorm";

export class default1667986947888 implements MigrationInterface {
    name = 'default1667986947888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`departamentos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`instituicaoDeEnsinoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`professores\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` text NOT NULL, \`email\` text NOT NULL, \`senha\` text NOT NULL, \`cpf\` text NOT NULL, \`qtdeMoedas\` int NOT NULL DEFAULT '0', \`departamentoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transacoes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`motivo\` text NOT NULL, \`valor\` double NOT NULL, \`professorId\` int NULL, \`alunoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`departamentos\` ADD CONSTRAINT \`FK_137d8453438eb35598c639a9226\` FOREIGN KEY (\`instituicaoDeEnsinoId\`) REFERENCES \`instituicoes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`professores\` ADD CONSTRAINT \`FK_9ed42446c4f62b68d103e1de9c7\` FOREIGN KEY (\`departamentoId\`) REFERENCES \`departamentos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transacoes\` ADD CONSTRAINT \`FK_9f65569ae406cdc4995f4efe5b7\` FOREIGN KEY (\`professorId\`) REFERENCES \`professores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transacoes\` ADD CONSTRAINT \`FK_d85d05b33c8ab70bec5e62c716e\` FOREIGN KEY (\`alunoId\`) REFERENCES \`alunos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transacoes\` DROP FOREIGN KEY \`FK_d85d05b33c8ab70bec5e62c716e\``);
        await queryRunner.query(`ALTER TABLE \`transacoes\` DROP FOREIGN KEY \`FK_9f65569ae406cdc4995f4efe5b7\``);
        await queryRunner.query(`ALTER TABLE \`professores\` DROP FOREIGN KEY \`FK_9ed42446c4f62b68d103e1de9c7\``);
        await queryRunner.query(`ALTER TABLE \`departamentos\` DROP FOREIGN KEY \`FK_137d8453438eb35598c639a9226\``);
        await queryRunner.query(`DROP TABLE \`transacoes\``);
        await queryRunner.query(`DROP TABLE \`professores\``);
        await queryRunner.query(`DROP TABLE \`departamentos\``);
    }

}
