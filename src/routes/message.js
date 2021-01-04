import { Router } from "express";
import { BadRequestError, NotFoundError } from "../utils/errors";

const router = Router();

router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.findAll().catch(
    (error) => new NotFoundError(error)
  );
  return res.send(messages);
});

router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId
  ).catch((error) => new NotFoundError(error));
  return res.send(message);
});

router.post("/", async (req, res, next) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  }).catch((error) => next(new BadRequestError()));
  return res.send(message);
});

router.delete("/:messageId", async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  }).catch(next);
  return res.send(true);
});

export default router;
