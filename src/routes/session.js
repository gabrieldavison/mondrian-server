import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.context.me.id).catch(
    next
  );
  return res.send(user);
});

export default router;
