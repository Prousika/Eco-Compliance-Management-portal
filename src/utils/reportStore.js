import { createReport, fetchMyReports, fetchReports } from "./api";
import { normalizeCampusBlock } from "./campusBlocks";

const inferBlock = (location = "") => {
  if (!location) return "Unknown Block";
  const inferred = location.split("-")[0].trim() || "Unknown Block";
  return normalizeCampusBlock(inferred);
};

const normalizeStatus = (status = "") => {
  const value = status.toLowerCase();
  if (value === "resolved") return "Resolved";
  if (value === "in progress") return "In Progress";
  if (value === "pending") return "Pending";
  if (value === "reopened") return "Reopened";
  return "Pending";
};

export const normalizeReport = (report) => ({
  ...report,
  status: normalizeStatus(report.status),
  category: report.category || report.type || "General",
  block: report.block || inferBlock(report.location),
  latitude: typeof report.latitude === "number" ? report.latitude : null,
  longitude: typeof report.longitude === "number" ? report.longitude : null,
  department: report.department || report.assignedWorker || "Unassigned",
  assignedWorker: report.assignedWorker || report.department || "Unassigned",
  ecoMember: report.ecoMember || "",
  reporterId: report.reporterId || "",
  reporterEmail: report.reporterEmail || "",
  contactInfo: report.contactInfo || "",
  assigneeContact:
    report.assigneeContact ||
    (typeof report.contactInfo === "string" && report.contactInfo.includes("@")
      ? ""
      : report.contactInfo || ""),
  internalNotes: report.internalNotes || "",
  timeline: Array.isArray(report.timeline) ? report.timeline : [],
  images: Array.isArray(report.images) && report.images.length ? report.images : [],
});

export const getReports = async (query) => {
  const reports = await fetchReports(query);
  return reports.map(normalizeReport);
};

export const getMyReports = async () => {
  const reports = await fetchMyReports();
  return reports.map(normalizeReport);
};

export const createIssueReport = async (payload) => {
  const report = await createReport(payload);
  window.dispatchEvent(new Event("eco-reports-changed"));
  return normalizeReport(report);
};

export const notifyReportsChanged = () => {
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
