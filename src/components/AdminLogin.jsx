import { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from "./admin/adminUtils";
import { loginAdmin } from "../utils/api";
import { saveSession } from "../utils/session";
import { useToast } from "./ui/ToastProvider";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const notice = useMemo(() => location.state?.message || "", [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await loginAdmin({
        email: email.trim().toLowerCase(),
        password,
      });
      saveSession(response);
      toast.success("Admin login successful.");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const message = err.message || "Invalid admin credentials.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p className="admin-login-subtitle">Eco-Compliance Portal Control Dashboard</p>
        {notice ? <p className="auth-alert">{notice}</p> : null}
        <form onSubmit={handleLogin}>
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            placeholder={DEFAULT_ADMIN_EMAIL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="admin-pass">Password</label>
          <input
            id="admin-pass"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={isSubmitting ? "btn-loading" : ""} disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login as Admin"}
          </button>
        </form>
        {error ? <p className="auth-alert auth-alert-error">{error}</p> : null}
        <p className="admin-login-help">
          Demo: <strong>{DEFAULT_ADMIN_EMAIL}</strong> / <strong>{DEFAULT_ADMIN_PASSWORD}</strong>
        </p>
        <NavLink to="/" className="admin-login-back">
          Back to Home
        </NavLink>
      </div>
    </section>
  );
};

export default AdminLogin;
