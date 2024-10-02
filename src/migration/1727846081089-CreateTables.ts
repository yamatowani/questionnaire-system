import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1727846081089 implements MigrationInterface {
    name = 'CreateTables1727846081089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin_user\` (\`admin_user_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NULL, \`password_digest\` varchar(255) NULL, \`session_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`admin_user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer\` (\`answer_id\` int NOT NULL AUTO_INCREMENT, \`option_id\` bigint NOT NULL, \`question_id\` bigint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`questionQuestionId\` int NULL, \`optionOptionId\` int NULL, PRIMARY KEY (\`answer_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`option\` (\`option_id\` int NOT NULL AUTO_INCREMENT, \`option_text\` varchar(255) NULL, \`question_id\` bigint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`questionQuestionId\` int NULL, PRIMARY KEY (\`option_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question\` (\`question_id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`url\` varchar(255) NOT NULL, \`admin_user_id\` bigint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`adminUserAdminUserId\` int NULL, PRIMARY KEY (\`question_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_d6b11fa94dbccb3d64d31fb36c6\` FOREIGN KEY (\`questionQuestionId\`) REFERENCES \`question\`(\`question_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_83919c098499142dcbc8c92175c\` FOREIGN KEY (\`optionOptionId\`) REFERENCES \`option\`(\`option_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`option\` ADD CONSTRAINT \`FK_2d4e6126f45821a7d1bdc405e3d\` FOREIGN KEY (\`questionQuestionId\`) REFERENCES \`question\`(\`question_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD CONSTRAINT \`FK_2aff34c8ec59942fe0e8ab541fd\` FOREIGN KEY (\`adminUserAdminUserId\`) REFERENCES \`admin_user\`(\`admin_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question\` DROP FOREIGN KEY \`FK_2aff34c8ec59942fe0e8ab541fd\``);
        await queryRunner.query(`ALTER TABLE \`option\` DROP FOREIGN KEY \`FK_2d4e6126f45821a7d1bdc405e3d\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_83919c098499142dcbc8c92175c\``);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_d6b11fa94dbccb3d64d31fb36c6\``);
        await queryRunner.query(`DROP TABLE \`question\``);
        await queryRunner.query(`DROP TABLE \`option\``);
        await queryRunner.query(`DROP TABLE \`answer\``);
        await queryRunner.query(`DROP TABLE \`admin_user\``);
    }

}
