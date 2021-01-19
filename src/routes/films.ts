import express, { Request, Response } from "express";
import { validate } from "class-validator";

import Film from "../entity/Film";
import Actor from "../entity/Actor";

const router: express.Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const films = await Film.find({
      relations: ["actors"],
      take: +limit,
      skip: (+page - 1) * +limit,
      order: { createdAt: "DESC" },
    });
    return res.json(films);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/:uuid", async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const film = await Film.findOneOrFail({ uuid }, { relations: ["actors"] });
    return res.json(film);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, description, releaseYear, rating, actorsUuid } = req.body;

    const actors: Actor[] = [];

    for (let i = 0; i < actorsUuid.length; i++) {
      const actor = await Actor.findOneOrFail({ uuid: actorsUuid[i] });
      actors.push(actor);
    }

    const film = Film.create({ name, description, releaseYear, rating, actors });

    const errors = await validate(film);
    if (errors.length > 0) throw errors;

    await film.save();
    return res.json(film);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

router.put("/:uuid", async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const { name, description, releaseYear, rating, actorsUuid } = req.body;

    const film = await Film.findOneOrFail({ uuid }, { relations: ["actors"] });

    const actors: Actor[] = [];

    if (actorsUuid) {
      for (let i = 0; i < actorsUuid.length; i++) {
        const actor = await Actor.findOneOrFail({ uuid: actorsUuid[i] });
        actors.push(actor);
      }
    }

    film.name = name || film.name;
    film.description = description || film.description;
    film.releaseYear = releaseYear || film.releaseYear;
    film.rating = rating || film.rating;
    film.actors = actors || film.actors;

    await film.save();
    return res.json(film);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

router.delete("/:uuid", async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;

    const film = await Film.findOneOrFail({ uuid });
    await film.remove();

    return res.json({ msg: "Film is successfully deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
