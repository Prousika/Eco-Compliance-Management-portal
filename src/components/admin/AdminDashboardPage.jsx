import { useEffect, useMemo, useState } from "react";
import {
  getAdminReports,
  getDepartmentBreakdown,
  getDashboardStats,
  getMonthlyTrend,
  getRegisteredUsers,
  updateReportStatus,
  WORKFLOW_OPTIONS,
} from "./adminUtils";
import { GroupedBarChart, PieCategoryChart } from "./ChartWidgets";

const AdminDashboardPage = () => {
  const [reports, setReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const sync = async () => {
      try {
        const [nextReports, nextUsers] = await Promise.all([
          getAdminReports(),
          getRegisteredUsers(),
        ]);
        setReports(nextReports);
        setUsers(nextUsers);
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load dashboard data.");
      }
    };
    sync();
    window.addEventListener("eco-reports-changed", sync);
    return () => window.removeEventListener("eco-reports-changed", sync);
  }, []);

  const stats = useMemo(() => getDashboardStats(reports), [reports]);
  const departmentBreakdown = useMemo(() => getDepartmentBreakdown(reports).slice(0, 6), [reports]);
  const trend = useMemo(() => getMonthlyTrend(reports), [reports]);
  const categories = useMemo(() => ["All", ...new Set(reports.map((r) => r.category || r.type || "General"))], [reports]);

  const filteredReports = reports
    .filter((report) => {
      const statusOk = statusFilter === "All" || report.status === statusFilter;
      const categoryOk = categoryFilter === "All" || (report.category || report.type) === categoryFilter;
      const query = search.trim().toLowerCase();
      const queryOk =
        !query ||
        report.reportNumber.toLowerCase().includes(query) ||
        String(report.location).toLowerCase().includes(query) ||
        String(report.type).toLowerCase().includes(query);
      return statusOk && categoryOk && queryOk;
    })
    .slice(0, 8);

  const handleStatus = async (reportNumber, status) => {
    try {
      setReports(await updateReportStatus(reportNumber, status));
      setError("");
    } catch (err) {
      setError(err.message || "Unable to update status.");
    }
  };

  return (
    <section className="admin-content-v2">
      <div className="admin-title-v2">
        <h1>Admin Dashboard</h1>
        <p>Overview of campus environmental compliance</p>
      </div>
      {error ? <p className="auth-alert auth-alert-error">{error}</p> : null}

      <div className="admin-kpi-row">
        <article><h3>{stats.total}</h3><p>Total Issues</p></article>
        <article><h3>{stats.pending}</h3><p>Pending</p></article>
        <article><h3>{stats.inProgress}</h3><p>In Progress</p></article>
        <article><h3>{stats.resolved}</h3><p>Resolved Issues</p></article>
        <article><h3>{users.length}</h3><p>Total Registered Users</p></article>
        <article><h3>{stats.complianceRate}%</h3><p>Eco Compliance Rate</p></article>
      </div>

      <div className="admin-grid-2">
        <PieCategoryChart title="Department-wise Complaints" data={departmentBreakdown} />
        <GroupedBarChart
          title="Monthly Issue Trend"
          data={trend}
          keys={["Pending", "In Progress", "Resolved"]}
          colors={["#f2c54b", "#4aa8de", "#5cae87"]}
        />
      </div>

      <div className="admin-card-v2">
        <div className="table-top-v2">
          <h2>Recent Issues</h2>
          <div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">Status</option>
              {WORKFLOW_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input
              type="text"
              placeholder="Search Report..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <table className="admin-table-v2">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.reportNumber}>
                <td>{report.reportNumber}</td>
                <td>{report.category || report.type}</td>
                <td>{report.location}</td>
                <td>
                  <span className={`status-pill-v2 ${report.status.toLowerCase().replace(" ", "-")}`}>
                    {report.status}
                  </span>
                </td>
                <td>{report.department || report.assignedWorker}</td>
                <td>
                  <select
                    value={report.status}
                    onChange={(e) => handleStatus(report.reportNumber, e.target.value)}
                  >
                    {WORKFLOW_OPTIONS.map((status) => (
                      <option key={`${report.reportNumber}-${status}`} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
