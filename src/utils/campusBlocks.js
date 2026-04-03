export const CAMPUS_BLOCKS = [
  "IB",
  "AS",
  "SF",
  "MECH",
  "CAFETARIA",
  "Ground",
  "Parking",
  "Girls Hostel",
  "Boys Hostel",
  "Others",
];

export const normalizeCampusBlock = (value = "") => {
  const raw = String(value).trim().toLowerCase();
  if (!raw) return "IB";

  if (raw.includes("ib")) return "IB";
  if (raw.includes("academic") || raw === "as" || raw.includes("as block")) return "AS";
  if (raw.includes("sf")) return "SF";
  if (raw.includes("mech")) return "MECH";
  if (raw.includes("caf")) return "CAFETARIA";
  if (raw.includes("ground") || raw.includes("play")) return "Ground";
  if (raw.includes("parking")) return "Parking";
  if (raw.includes("girls")) return "Girls Hostel";
  if (raw.includes("boys")) return "Boys Hostel";
  if (raw.includes("other")) return "Others";

  const direct = CAMPUS_BLOCKS.find((block) => block.toLowerCase() === raw);
  return direct || "Others";
};
