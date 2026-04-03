import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, adminOnly, getSettings);
router.put("/", protect, adminOnly, updateSettings);

export default router;
