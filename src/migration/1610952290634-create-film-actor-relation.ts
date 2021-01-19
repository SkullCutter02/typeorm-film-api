import {MigrationInterface, QueryRunner} from "typeorm";

export class createFilmActorRelation1610952290634 implements MigrationInterface {
    name = 'createFilmActorRelation1610952290634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "films_actors_actors" ("filmsId" integer NOT NULL, "actorsId" integer NOT NULL, CONSTRAINT "PK_2a01b4c796090a6eda1c79ccdc3" PRIMARY KEY ("filmsId", "actorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d7b4ac21a8e0ebf3bebfd86de1" ON "films_actors_actors" ("filmsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_55a6ccc5565cb64257a3f8e995" ON "films_actors_actors" ("actorsId") `);
        await queryRunner.query(`ALTER TABLE "films_actors_actors" ADD CONSTRAINT "FK_d7b4ac21a8e0ebf3bebfd86de1d" FOREIGN KEY ("filmsId") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "films_actors_actors" ADD CONSTRAINT "FK_55a6ccc5565cb64257a3f8e9953" FOREIGN KEY ("actorsId") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "films_actors_actors" DROP CONSTRAINT "FK_55a6ccc5565cb64257a3f8e9953"`);
        await queryRunner.query(`ALTER TABLE "films_actors_actors" DROP CONSTRAINT "FK_d7b4ac21a8e0ebf3bebfd86de1d"`);
        await queryRunner.query(`DROP INDEX "IDX_55a6ccc5565cb64257a3f8e995"`);
        await queryRunner.query(`DROP INDEX "IDX_d7b4ac21a8e0ebf3bebfd86de1"`);
        await queryRunner.query(`DROP TABLE "films_actors_actors"`);
    }

}
