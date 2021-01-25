import jwt from "jsonwebtoken";

export const authorizeBox = async (req, res, next) => {
  console.log(req.body, "body");

  const pageId = req.body.PageId || req.body[0].PageId;

  authorize(pageId, req, res, next);
};

export const authorizePage = async (req, res, next) => {
  console.log(req.params, "params");

  const pageId = req.params.pageId;

  authorize(pageId, req, res, next);
};

async function authorize(pageId, req, res, next) {
  let pageLocked;
  try {
    pageLocked = await req.context.Page.findOne({
      where: {
        id: pageId,
      },
    }).then((res) => res.locked);
  } catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }

  if (pageLocked) {
    console.log("locked");
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET);
      console.log("token verified");
      next();
    } catch (error) {
      res.status(401).json({ message: "Authentication failed!" });
    }
  } else next();
}
