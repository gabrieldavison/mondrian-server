import "dotenv/config";
import cors from "cors";
import express from "express";
import pageRoute from "./routes/page";
import boxRoute from "./routes/box";
import boxCollectionRoute from "./routes/box-collection";
import createSeedData from "./utils/createSeedData";
const db = require("./models/index");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  req.context = {
    Page: db.Page,
    Box: db.Box,
  };
  next();
});

app.use("/pages", pageRoute);
app.use("/boxes", boxRoute);
app.use("/box-collection", boxCollectionRoute);

app.get("*", (req, res, next) => {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 301;
  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
  if (error.statusCode === 301) {
    return res.status(301).redirect("/not-found");
  }
  return res.status(error.statusCode).json({ error: error.toString() });
});
console.log(process.env.ERASE_DB, "erase");

const eraseDatabaseOnSync = process.env.ERASE_DB === "true";

console.log(eraseDatabaseOnSync, "type");

db.sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    createSeedData();
  }
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
