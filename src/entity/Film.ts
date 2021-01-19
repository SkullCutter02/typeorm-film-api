import { Column, Entity, JoinTable, ManyToMany, Unique } from "typeorm";
import { Min, Max, Length } from "class-validator";

import Actor from "./Actor";
import Model from "./Model";

@Entity("films")
@Unique(["name"])
export default class Film extends Model {
  @Column()
  @Length(1, 100)
  name: string;

  @Column()
  @Length(25, 500)
  description: string;

  @Column()
  @Min(1900)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @Column()
  @Min(0)
  @Max(100)
  rating: number;

  @ManyToMany(() => Actor, (actor) => actor.films)
  @JoinTable()
  actors: Actor[];
}
