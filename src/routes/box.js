import { Router } from "express";
import { BadRequestError, NotFoundError } from "../utils/errors";
const router = Router();

//Create box
router.post("/", async (req, res) => {
  const box = await req.context.Box.create(req.body).catch(
    (error) => new BadRequestError(error)
  );
  return res.send(box);
});

// Get all boxes
router.get("/", async (req, res) => {
  const boxes = await req.context.Box.findAll().catch(
    (error) => new NotFoundError(error)
  );
  return res.send(boxes);
});

//Get specific box
router.get("/:boxId", async (req, res) => {
  const box = await req.context.Box.findAll({
    where: {
      id: req.params.boxId,
    },
  }).catch((error) => new NotFoundError(error));
  return res.send(box);
});

//Update box
router.put("/:boxId", async (req, res) => {
  const updatedBox = await req.context.Box.update(req.body, {
    where: {
      id: req.params.boxId,
    },
  }).catch((error) => new NotFoundError(error));
  return res.send(updatedBox);
});

//Update multiple boxes, takes an array of boxes.
router.put("/", async (req, res) => {
  console.log("multiple boxes");
  console.log(req.body);
  const updatedBoxes = req.body.forEach(async (box) => {
    const updatedBox = await req.context.Box.update(box, {
      where: {
        id: box.id,
      },
    }).catch((error) => new NotFoundError(error));
  });
  return res.send(updatedBoxes);
});

//Delete box
router.delete("/:boxId", async (req, res, next) => {
  const result = await req.context.Box.destroy({
    where: { id: req.params.boxId },
  }).catch(next);
  return res.send(true);
});

export default router;
