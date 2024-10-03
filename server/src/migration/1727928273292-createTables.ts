import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1727928273292 implements MigrationInterface {
    name = 'CreateTables1727928273292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin_users\` (\`admin_user_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NULL, \`email\` varchar(255) NULL, \`password_digest\` varchar(255) NULL, \`session_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`admin_user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answers\` (\`answer_id\` int NOT NULL AUTO_INCREMENT, \`option_id\` int NOT NULL, \`question_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`answer_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`options\` (\`option_id\` int NOT NULL AUTO_INCREMENT, \`option_text\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`questionQuestionId\` int NULL, PRIMARY KEY (\`option_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`questions\` (\`question_id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`adminUserAdminUserId\` int NULL, PRIMARY KEY (\`question_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_677120094cf6d3f12df0b9dc5d3\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`question_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_67e979b8942acc80137116b6f12\` FOREIGN KEY (\`option_id\`) REFERENCES \`options\`(\`option_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`options\` ADD CONSTRAINT \`FK_078a27286b2476f400fcab79044\` FOREIGN KEY (\`questionQuestionId\`) REFERENCES \`questions\`(\`question_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_c79dfed7458781aeeee3548e41c\` FOREIGN KEY (\`adminUserAdminUserId\`) REFERENCES \`admin_users\`(\`admin_user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_c79dfed7458781aeeee3548e41c\``);
        await queryRunner.query(`ALTER TABLE \`options\` DROP FOREIGN KEY \`FK_078a27286b2476f400fcab79044\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_67e979b8942acc80137116b6f12\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_677120094cf6d3f12df0b9dc5d3\``);
        await queryRunner.query(`DROP TABLE \`questions\``);
        await queryRunner.query(`DROP TABLE \`options\``);
        await queryRunner.query(`DROP TABLE \`answers\``);
        await queryRunner.query(`DROP TABLE \`admin_users\``);
    }

}
