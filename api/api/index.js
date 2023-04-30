import potholeRoutes from "./potholeRoutes.js";
import userRoutes from "./userRoutes.js";
import commentRoutes from "./commentRoutes.js";
import express from "express"
const router = express.Router()

  router.use("/potholeRoutes", potholeRoutes);
  router.use("/userRoutes", userRoutes);
  router.use("/commentRoutes", commentRoutes);

  router.use("*", (req, res) => {
    res.sendStatus(404);
  });


export default router;
