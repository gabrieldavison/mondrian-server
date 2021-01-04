import { Router } from "express";
import { NotFoundError } from "../utils/errors";

const router = Router();

router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll().catch(next);
  return res.send(users);
});

router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId).catch(
    (error) => new NotFoundError(error)
  );
  return res.send(user);
});

export default router;
