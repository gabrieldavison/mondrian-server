import { Router } from "express";
import { authorizeBox } from "../middleware/auth";
import { BadRequestError, NotFoundError } from "../utils/errors";
const router = Router();

//Create box
router.post("/", authorizeBox, async (req, res) => {
  const boxes = await req.context.Box.bulkCreate(req.body).catch(
    (error) => new BadRequestError(error)
  );
  return res.send(boxes);
});

export default router;
