import AdminSetting from "../models/AdminSetting.js";

const defaults = {
  categories: "Water Leakage, Plastic Waste, Garbage Overflow, Street Light",
  zones: "IB, AS, SF, MECH, CAFETARIA, Ground, Parking, Girls Hostel, Boys Hostel, Others",
  adminName: "Admin",
  adminEmail: "admin@ecoportal.com",
  passwordHint: "",
};

export const getSettings = async (req, res) => {
  let doc = await AdminSetting.findOne();
  if (!doc) doc = await AdminSetting.create(defaults);
  return res.json(doc);
};

export const updateSettings = async (req, res) => {
  let doc = await AdminSetting.findOne();
  if (!doc) doc = await AdminSetting.create(defaults);

  doc.categories = req.body.categories ?? doc.categories;
  doc.zones = req.body.zones ?? doc.zones;
  doc.adminName = req.body.adminName ?? doc.adminName;
  doc.adminEmail = req.body.adminEmail ?? doc.adminEmail;
  doc.passwordHint = req.body.passwordHint ?? doc.passwordHint;
  await doc.save();
  return res.json(doc);
};
