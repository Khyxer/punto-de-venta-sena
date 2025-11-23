import express from "express";
import { getDashboardDataController } from "../controllers/dashboard.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getDashboardDataController);

export default router;
