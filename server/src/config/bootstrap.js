import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const ensureAdminUser = async () => {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@ecoportal.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const existing = await User.findOne({ email: adminEmail });
  if (existing) return;

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await User.create({
    name: "Admin",
    email: adminEmail,
    phone: "",
    passwordHash,
    role: "admin",
  });
  // eslint-disable-next-line no-console
  console.log(`Default admin created: ${adminEmail}`);
};
