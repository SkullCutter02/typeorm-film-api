import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";

const app: express.Application = express();

app.use(express.json());

app.use("/films", require("./routes/films"));
app.use("/actors", require("./routes/actors"));

const PORT = process.env.PORT || 5000;

createConnection()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
