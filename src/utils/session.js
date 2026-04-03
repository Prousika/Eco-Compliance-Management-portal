const SESSION_KEY = "ecoSession";

const dispatchAuthChanged = () => {
  window.dispatchEvent(new Event("eco-auth-changed"));
};

export const getSession = () => {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getAuthToken = () => getSession()?.token || "";

export const getCurrentUser = () => getSession()?.user || null;

export const isLoggedIn = () => Boolean(getAuthToken() && getCurrentUser());

export const isAdmin = () => getCurrentUser()?.role === "admin";

export const saveSession = ({ token, user }) => {
  const session = {
    token,
    user,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem("ecoLoggedIn", "true");
  localStorage.setItem("ecoLoggedInName", user?.name || "User");
  localStorage.setItem("ecoAuthRole", user?.role || "user");
  dispatchAuthChanged();
  return session;
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("ecoLoggedIn");
  localStorage.removeItem("ecoLoggedInName");
  localStorage.removeItem("ecoLoggedInUser");
  localStorage.removeItem("ecoAuthRole");
  dispatchAuthChanged();
};
