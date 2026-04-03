import { getAuthToken } from "./session";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const buildUrl = (path, query) => {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }
  return url.toString();
};

const request = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});
  const token = getAuthToken();

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path, options.query), {
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
};

export const registerUser = (payload) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const loginUser = (payload) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const loginAdmin = (payload) =>
  request("/auth/admin-login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const fetchReports = (query) =>
  request("/reports", {
    query,
  });

export const fetchMyReports = () => request("/reports/my");

export const fetchHomeStats = () => request("/reports/summary");

export const createReport = (payload) =>
  request("/reports", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const patchReportStatus = (reportNumber, status) =>
  request(`/reports/${reportNumber}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const patchReportMeta = (reportNumber, payload) =>
  request(`/reports/${reportNumber}/meta`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const postInternalNote = (reportNumber, note) =>
  request(`/reports/${reportNumber}/notes`, {
    method: "PATCH",
    body: JSON.stringify({ note }),
  });

export const fetchUsers = () => request("/users");

export const toggleUserDisabledApi = (userId) =>
  request(`/users/${userId}/toggle-disabled`, {
    method: "PATCH",
  });

export const toggleUserVolunteerApi = (userId) =>
  request(`/users/${userId}/toggle-volunteer`, {
    method: "PATCH",
  });

export const fetchAwareness = () => request("/awareness");

export const saveAwareness = (payload) =>
  request("/awareness", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const fetchSettings = () => request("/settings");

export const saveSettings = (payload) =>
  request("/settings", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const fetchNotifications = () => request("/notifications");

export const createNotification = (payload) =>
  request("/notifications", {
    method: "POST",
    body: JSON.stringify(payload),
  });
