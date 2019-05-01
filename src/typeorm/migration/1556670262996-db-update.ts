// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from 'typeorm';

export class dbUpdate1556670262996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(64) NOT NULL, "lastName" character varying(64) NOT NULL, "email" character varying(64) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "post_category_enum" AS ENUM('National', 'International', 'Technology', 'Sport', 'Entertainment')`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(256) NOT NULL, "body" text NOT NULL, "category" "post_category_enum" NOT NULL DEFAULT 'National', "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "authorId" uuid NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TYPE "post_category_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
