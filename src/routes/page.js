import { Router } from "express";
import { BadRequestError, NotFoundError } from "../utils/errors";

const router = Router();

//Create Page
router.post("/", async (req, res, next) => {
  const page = await req.context.Page.create({
    name: req.body.name,
  }).catch((error) => next(error));
  return res.send(page);
});

//Get all pages or query pages based on ?param=param
router.get("/", async (req, res, next) => {
  let pages;
  console.log("get");
  if (Object.keys(req.query).length !== 0) {
    console.log(req.query);
    pages = await req.context.Page.findOne({
      include: {
        model: req.context.Box,
      },
      order: [[req.context.Box, "position", "ASC"]],
      where: {
        ...req.query,
      },
    }).catch(next);
  } else {
    pages = await req.context.Page.findAll().catch(
      (error) => new NotFoundError(error)
    );
  }
  return res.send(pages);
});

router.get("/:pageId", async (req, res) => {
  console.log(req.query);

  const page = await req.context.Page.findAll({
    where: {
      id: req.params.pageId,
    },
  }).catch((error) => new NotFoundError(error));
  return res.send(page);
});

//update page
router.put("/:pageId", async (req, res) => {
  const updatedPage = await req.context.Page.update(req.body, {
    where: {
      id: req.params.pageId,
    },
  }).catch((error) => new NotFoundError(error));
  return res.send(updatedPage);
});

//Delete page
router.delete("/:pageId", async (req, res, next) => {
  const result = await req.context.Page.destroy({
    where: { id: req.params.pageId },
  }).catch(next);
  return res.send(true);
});

export default router;
