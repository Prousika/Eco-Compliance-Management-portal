import { reports as seedReports } from "../data/reports";

export const REPORTS_STORAGE_KEY = "ecoReports";

const inferBlock = (location = "") => {
  if (!location) return "Unknown Block";
  return location.split("-")[0].trim() || "Unknown Block";
};

const normalizeStatus = (status = "") => {
  const value = status.toLowerCase();
  if (value === "resolved") return "Resolved";
  if (value === "in progress") return "In Progress";
  if (value === "pending") return "Pending";
  if (value === "reopened") return "Reopened";
  return "Pending";
};

const normalizeReport = (report) => ({
  ...report,
  status: normalizeStatus(report.status),
  category: report.category || report.type || "General",
  block: report.block || inferBlock(report.location),
  department: report.department || report.assignedWorker || "Unassigned",
  ecoMember: report.ecoMember || "",
  contactInfo: report.contactInfo || "",
  internalNotes: report.internalNotes || "",
  timeline: Array.isArray(report.timeline) ? report.timeline : [],
});

export const seedReportsIfNeeded = () => {
  const existing = localStorage.getItem(REPORTS_STORAGE_KEY);
  if (existing) return;
  const normalized = seedReports.map(normalizeReport);
  localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(normalized));
};

export const getReports = () => {
  seedReportsIfNeeded();
  const raw = localStorage.getItem(REPORTS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return parsed.map(normalizeReport);
  } catch {
    const normalized = seedReports.map(normalizeReport);
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }
};

export const saveReports = (reports) => {
  localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
  window.dispatchEvent(new Event("eco-reports-changed"));
};

export const getReportStats = (reports) => {
  const total = reports.length;
  const pending = reports.filter((report) =>
    ["Pending", "Reopened"].includes(report.status)
  ).length;
  const inProgress = reports.filter(
    (report) => report.status === "In Progress"
  ).length;
  const resolved = reports.filter((report) => report.status === "Resolved").length;
  const complianceRate = total ? Math.round((resolved / total) * 100) : 0;

  return {
    total,
    pending,
    inProgress,
    resolved,
    complianceRate,
  };
};

