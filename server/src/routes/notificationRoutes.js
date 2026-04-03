import { Router } from "express";
import { createNotification, listNotifications } from "../controllers/notificationController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, adminOnly, listNotifications);
router.post("/", protect, adminOnly, createNotification);

export default router;
