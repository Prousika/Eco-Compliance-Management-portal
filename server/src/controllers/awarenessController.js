import AwarenessContent from "../models/AwarenessContent.js";

const defaults = {
  tips: "Switch off lights after use.\nUse reusable bottles.",
  policies: "Single-use plastics discouraged.\nMonthly eco audits required.",
  announcement: "Green Campus Drive starts this Friday.",
  complianceFormula: "(Resolved Issues / Total Issues) x 100",
};

export const getAwareness = async (req, res) => {
  let doc = await AwarenessContent.findOne();
  if (!doc) doc = await AwarenessContent.create(defaults);
  return res.json(doc);
};

export const updateAwareness = async (req, res) => {
  let doc = await AwarenessContent.findOne();
  if (!doc) doc = await AwarenessContent.create(defaults);

  doc.tips = req.body.tips ?? doc.tips;
  doc.policies = req.body.policies ?? doc.policies;
  doc.announcement = req.body.announcement ?? doc.announcement;
  doc.complianceFormula = req.body.complianceFormula ?? doc.complianceFormula;
  await doc.save();
  return res.json(doc);
};
