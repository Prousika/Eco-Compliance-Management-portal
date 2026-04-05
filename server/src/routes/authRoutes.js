import { Router } from "express";
import {
  adminLogin,
  login,
  register,
  requestPhoneOtp,
  verifyPhoneOtp,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.post("/phone/request-otp", requestPhoneOtp);
router.post("/phone/verify-otp", verifyPhoneOtp);

export default router;
