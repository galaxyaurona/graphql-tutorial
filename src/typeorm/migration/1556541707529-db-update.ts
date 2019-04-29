// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class dbUpdate1556541707529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(64) NOT NULL, "lastName" character varying(64) NOT NULL, "email" character varying(64) NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
