import express, { Request, Response } from "express";
import { validate } from "class-validator";

import Actor from "../entity/Actor";

const router: express.Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const actors = await Actor.find({
      relations: ["films"],
      take: +limit,
      skip: (+page - 1) * +limit,
      order: { createdAt: "DESC" },
    });
    return res.json(actors);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

router.get("/:uuid", async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const actor = await Actor.findOneOrFail({ uuid }, { relations: ["films"] });
    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, age } = req.body;
    const actor = Actor.create({ name, age });

    const errors = await validate(actor);
    if (errors.length > 0) throw errors;

    await actor.save();
    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

router.put("/:uuid", async (req: Request, res: Response) => {
  try {
    const { name, age } = req.body;
    const { uuid } = req.params;

    const actor = await Actor.findOneOrFail({ uuid });

    actor.name = name || actor.name;
    actor.age = age || actor.age;

    const errors = await validate(actor);
    if (errors.length > 0) throw errors;

    await actor.save();
    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

router.delete("/:uuid", async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;

    const actor = await Actor.findOneOrFail({ uuid });
    await actor.remove();

    return res.json({ msg: "Actor successfully deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
