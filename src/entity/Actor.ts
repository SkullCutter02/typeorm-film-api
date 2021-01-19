import { Entity, Column, ManyToMany, Unique } from "typeorm";
import { Length, Min, Max } from "class-validator";

import Film from "./Film";
import Model from "./Model";

@Entity("actors")
@Unique(["name"])
export default class Actor extends Model {
  @Column()
  @Length(1, 80)
  name: string;

  @Column()
  @Min(1)
  @Max(150)
  age: number;

  @ManyToMany(() => Film, (film) => film.actors)
  films: Film[];
}
