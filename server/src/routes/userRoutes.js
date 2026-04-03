import { Router } from "express";
import { getUsers, toggleDisabled, toggleVolunteer } from "../controllers/userController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, adminOnly, getUsers);
router.patch("/:id/toggle-disabled", protect, adminOnly, toggleDisabled);
router.patch("/:id/toggle-volunteer", protect, adminOnly, toggleVolunteer);

export default router;
