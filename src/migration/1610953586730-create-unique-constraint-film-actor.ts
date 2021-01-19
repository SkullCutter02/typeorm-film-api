import {MigrationInterface, QueryRunner} from "typeorm";

export class createUniqueConstraintFilmActor1610953586730 implements MigrationInterface {
    name = 'createUniqueConstraintFilmActor1610953586730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "films"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "films" ADD CONSTRAINT "UQ_936e1cc7dc8c658446382192559" UNIQUE ("name")`);
        await queryRunner.query(`COMMENT ON COLUMN "actors"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "actors" ADD CONSTRAINT "UQ_ec613da22320a4d2232afb288c7" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actors" DROP CONSTRAINT "UQ_ec613da22320a4d2232afb288c7"`);
        await queryRunner.query(`COMMENT ON COLUMN "actors"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "films" DROP CONSTRAINT "UQ_936e1cc7dc8c658446382192559"`);
        await queryRunner.query(`COMMENT ON COLUMN "films"."name" IS NULL`);
    }

}
