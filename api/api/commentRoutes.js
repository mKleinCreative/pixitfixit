import express, { response } from "express";

import { commentController } from "../controllers/index.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { user_id, pothole_id, message, PhotoUrl } = req.body;
    const createdcomment = await commentController.CreateComment(
      user_id,
      pothole_id,
      message,
      PhotoUrl
    );
    res.status(201).json(createdcomment);
  } catch (error) {
    res.status(400).json({ error: "this comment was not able to be created!" });
  }
});
router.get("/comment/pothole/:pothole_id", async (req, res) => {
  try {
    const { pothole_id } = req.params;
    const allpotholeComments = await commentController.GetAllPotholeComments(
      new ObjectId(pothole_id)
    );
    res.status(201).json(allpotholeComments);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
router.get("/comment/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const comment = await commentController.GetAllCommentsByUser(user_id);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: "there is no comments need to try again!" });
  }
});

router.delete(
  "/comment/pothole/:user_id/:pothole_id/:comment_id",
  async (req, res) => {
    try {
      const { user_id, pothole_id, comment_id } = req.params;
      const deletedComment = await commentController.DeleteComment(
        user_id,
        pothole_id,
        comment_id
      );
      res.status(201).json(deletedComment);
    } catch (error) {
      res
        .status(400)
        .json({ error: "this comment was not able to be deleted!" });
    }
  }
);

export default router;
