import express from "express";
import { potholeController } from "../controllers/index.js";


const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { _id, user_id, status, photo_url, lat, long, assignedTo, zipcode, comments } = req.body;
    const result = await potholeController.CreatePotHole(_id, user_id, status, photo_url, lat, long, assignedTo, zipcode, comments);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await potholeController.GetPothole(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.patch("/assign/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { assignedTo } = req.body;
      const result = await potholeController.AssignPotHoles(id, assignedTo);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await potholeController.DeletePothole(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  export default router;