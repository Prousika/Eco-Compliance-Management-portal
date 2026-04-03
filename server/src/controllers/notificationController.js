import Notification from "../models/Notification.js";

export const listNotifications = async (req, res) => {
  const docs = await Notification.find({}).sort({ createdAt: -1 }).limit(100);
  return res.json(docs);
};

export const createNotification = async (req, res) => {
  const { type, message } = req.body;
  if (!type || !message) return res.status(400).json({ message: "type and message are required" });
  const doc = await Notification.create({ type, message });
  return res.status(201).json(doc);
};
