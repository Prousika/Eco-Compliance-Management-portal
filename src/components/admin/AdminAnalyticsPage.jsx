import { useEffect, useMemo, useState } from "react";
import {
  exportCsv,
  getAdminReports,
  getAverageResolutionDays,
  getBlockWiseCounts,
  getDepartmentBreakdown,
  getDashboardStats,
  getMonthlyTrend,
} from "./adminUtils";
import { GroupedBarChart, PieCategoryChart } from "./ChartWidgets";

const downloadFile = (filename, content, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const AdminAnalyticsPage = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const sync = async () => {
      try {
        setReports(await getAdminReports());
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load analytics.");
      }
    };
    sync();
    window.addEventListener("eco-reports-changed", sync);
    return () => window.removeEventListener("eco-reports-changed", sync);
  }, []);

  const stats = useMemo(() => getDashboardStats(reports), [reports]);
  const departmentBreakdown = useMemo(() => getDepartmentBreakdown(reports), [reports]);
  const trend = useMemo(() => getMonthlyTrend(reports), [reports]);
  const blockCounts = useMemo(() => getBlockWiseCounts(reports), [reports]);
  const avgResolutionDays = useMemo(() => getAverageResolutionDays(reports), [reports]);

  const summary = {
    generatedAt: new Date().toISOString(),
    totalIssues: stats.total,
    pending: stats.pending,
    inProgress: stats.inProgress,
    resolved: stats.resolved,
    complianceRate: stats.complianceRate,
    averageResolutionDays: avgResolutionDays,
    departmentBreakdown,
    monthlyTrend: trend,
    blockWiseComparison: blockCounts,
  };

  return (
    <section className="admin-content-v2">
      <div className="admin-title-v2">
        <h1>Analytics & Reports</h1>
        <p>Category breakdown, trend graph, resolution speed and block comparison.</p>
      </div>
      {error ? <p className="auth-alert auth-alert-error">{error}</p> : null}

      <div className="admin-kpi-row analytics-kpi-v2">
        <article><h3>{avgResolutionDays}</h3><p>Avg Resolution (Days)</p></article>
        <article><h3>{blockCounts.length}</h3><p>Active Blocks</p></article>
        <article><h3>{stats.complianceRate}%</h3><p>Compliance Rate</p></article>
      </div>

      <div className="admin-grid-2">
        <PieCategoryChart title="Department-wise Breakdown" data={departmentBreakdown} />
        <GroupedBarChart
          title="Monthly Trend"
          data={trend}
          keys={["Pending", "In Progress", "Resolved"]}
          colors={["#f2c54b", "#4aa8de", "#5cae87"]}
        />
      </div>

      <div className="admin-card-v2">
        <div className="table-top-v2">
          <h2>Block-wise Issue Comparison</h2>
          <div>
            <button
              type="button"
              onClick={() =>
                downloadFile(
                  `eco-issues-${new Date().toISOString().slice(0, 10)}.csv`,
                  exportCsv(reports),
                  "text/csv;charset=utf-8;"
                )
              }
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={() =>
                downloadFile(
                  `eco-summary-${new Date().toISOString().slice(0, 10)}.json`,
                  JSON.stringify(summary, null, 2),
                  "application/json"
                )
              }
            >
              Download Summary
            </button>
          </div>
        </div>
        <GroupedBarChart
          title="Block-wise Issue Comparison"
          data={blockCounts.map((item) => ({ ...item, key: item.block, label: item.block, Total: item.count }))}
          keys={["Total"]}
          colors={["#7aa8f8"]}
          maxValue={Math.max(1, ...blockCounts.map((item) => item.count))}
        />
      </div>
    </section>
  );
};

export default AdminAnalyticsPage;
