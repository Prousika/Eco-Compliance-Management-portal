import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const normalizePhone = (phone) => String(phone || "").replace(/\D/g, "");
const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

export const register = async (req, res) => {
  const { name, phone, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }
  const normalizedEmail = String(email).trim().toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) return res.status(409).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name.trim(),
    phone: phone || "",
    email: normalizedEmail,
    passwordHash,
    role: "user",
  });

  const token = signToken(user);
  return res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email and password required" });

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select("+passwordHash");
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  if (user.disabled) return res.status(403).json({ message: "Account disabled" });

  const token = signToken(user);
  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email and password required" });

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail, role: "admin" }).select("+passwordHash");
  if (!user) return res.status(401).json({ message: "Invalid admin credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid admin credentials" });

  const token = signToken(user);
  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

export const requestPhoneOtp = async (req, res) => {
  const normalizedPhone = normalizePhone(req.body.phone);
  if (!normalizedPhone || normalizedPhone.length < 10) {
    return res.status(400).json({ message: "Valid phone number required" });
  }

  const user = await User.findOne({ phone: normalizedPhone }).select("+phoneOtpCode +phoneOtpExpiresAt");
  if (!user) return res.status(404).json({ message: "Phone number is not registered" });
  if (user.disabled) return res.status(403).json({ message: "Account disabled" });

  const otp = generateOtp();
  user.phoneOtpCode = otp;
  user.phoneOtpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  // eslint-disable-next-line no-console
  console.log(`Phone OTP for ${normalizedPhone}: ${otp}`);

  return res.json({
    message: "OTP sent successfully",
    otp: process.env.NODE_ENV !== "production" ? otp : undefined,
  });
};

export const verifyPhoneOtp = async (req, res) => {
  const normalizedPhone = normalizePhone(req.body.phone);
  const otp = String(req.body.otp || "").trim();
  if (!normalizedPhone || !otp) {
    return res.status(400).json({ message: "Phone number and OTP are required" });
  }

  const user = await User.findOne({ phone: normalizedPhone }).select("+phoneOtpCode +phoneOtpExpiresAt");
  if (!user) return res.status(404).json({ message: "Phone number is not registered" });
  if (user.disabled) return res.status(403).json({ message: "Account disabled" });
  if (!user.phoneOtpCode || !user.phoneOtpExpiresAt || user.phoneOtpExpiresAt.getTime() < Date.now()) {
    return res.status(400).json({ message: "OTP expired. Please request a new OTP." });
  }
  if (user.phoneOtpCode !== otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  user.phoneOtpCode = "";
  user.phoneOtpExpiresAt = null;
  await user.save();

  const token = signToken(user);
  return res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};
