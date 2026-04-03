import { Router } from "express";
import { getAwareness, updateAwareness } from "../controllers/awarenessController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = Router();

router.get("/", getAwareness);
router.put("/", protect, adminOnly, updateAwareness);

export default router;
