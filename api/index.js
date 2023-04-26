import { join } from "path";
const router = require("express").Router();
import apiRoutes from "./api";

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use((req, res) =>
  res.sendFile(join(__dirname, "../client/build/index.html"))
);

export default router;
