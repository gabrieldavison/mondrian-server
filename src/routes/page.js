import { Router } from "express";
import { NotFoundError } from "../utils/errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authorizePage } from "../middleware/auth";

const router = Router();

//Create Page
router.post("/", async (req, res, next) => {
  const page = await req.context.Page.create({
    name: req.body.name,
  }).catch((error) => next(error));
  return res.send(page);
});

router.post("/:id", async (req, res, next) => {
  const page = await req.context.Page.findOne({
    attributes: ["name", "password"],
    where: {
      id: req.params.id,
    },
  });
  const passwordMatch = await bcrypt.compare(req.body.password, page.password);
  if (passwordMatch) {
    let jwtToken = jwt.sign(
      {
        pageName: page.name,
        id: page.id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      token: jwtToken,
    });
  } else {
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
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

//Update page (patch)
router.patch("/:pageId", authorizePage, async (req, res) => {
  //Hash password if there is one
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  console.log(req.body.password);
  const updatedPage = await req.context.Page.update(req.body, {
    where: {
      id: req.params.pageId,
    },
  }).catch((error) => new NotFoundError(error));
  console.log(updatedPage);
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
