import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668482536699 implements MigrationInterface {
    name = 'default1668482536699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transacoes\` DROP COLUMN \`valor\``);
        await queryRunner.query(`ALTER TABLE \`transacoes\` ADD \`valor\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transacoes\` DROP COLUMN \`valor\``);
        await queryRunner.query(`ALTER TABLE \`transacoes\` ADD \`valor\` double NOT NULL`);
    }

}
