import {
  FaCheckCircle,
  FaClipboardCheck,
  FaLightbulb,
  FaTrashAlt,
} from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router";
import Header from "./Header";
import { getReports, getReportStats } from "../utils/reportStore";

const EcoAwareness = () => {
  const [reports, setReports] = useState(() => getReports());

  useEffect(() => {
    const syncReports = () => setReports(getReports());
    syncReports();
    window.addEventListener("eco-reports-changed", syncReports);
    window.addEventListener("storage", syncReports);
    return () => {
      window.removeEventListener("eco-reports-changed", syncReports);
      window.removeEventListener("storage", syncReports);
    };
  }, []);

  const { total: totalIssues, resolved: resolvedIssues, complianceRate } =
    useMemo(() => getReportStats(reports), [reports]);

  return (
    <>
      <Header />
      <section className="eco-awareness-page">
        <div className="eco-awareness-shell">
          <h1>Eco Awareness</h1>
          <p>
            Learn practical sustainability actions for campus life beyond
            complaint reporting.
          </p>

          <div className="eco-score-card">
            <h2>Campus Eco Compliance Rate: {complianceRate}%</h2>
            <p>
              Sustainability Score = (Resolved Issues / Total Issues) x 100
            </p>

            <div className="eco-score-progress">
              <span style={{ width: `${complianceRate}%` }} />
            </div>

            <div className="eco-score-stats">
              <div className="eco-stat-item">
                <FaCheckCircle />
                <strong>{complianceRate}%</strong>
                <span>Eco Compliance</span>
              </div>
              <div className="eco-stat-item">
                <FaCheckCircle />
                <strong>{resolvedIssues}</strong>
                <span>Resolved Issues</span>
              </div>
              <div className="eco-stat-item">
                <FaCheckCircle />
                <strong>{totalIssues}</strong>
                <span>Total Issues</span>
              </div>
            </div>
          </div>

          <div className="eco-awareness-grid">
            <article className="eco-awareness-card">
              <h3>
                <FaTrashAlt />
                Waste Segregation Guidelines
              </h3>
              <ul>
                <li>Use green bins for biodegradable waste.</li>
                <li>Use blue bins for paper, plastic, and dry recyclables.</li>
                <li>Do not mix food waste with recyclables.</li>
                <li>Dispose of e-waste only at designated e-waste points.</li>
              </ul>
              <NavLink to="/reportissue" className="eco-cta-btn">
                Submit Eco Issue
              </NavLink>
            </article>

            <article className="eco-awareness-card">
              <h3>
                <FaLightbulb />
                Energy Saving Tips
              </h3>
              <ul>
                <li>Switch off lights, fans, and projectors after class.</li>
                <li>Prefer natural daylight where possible.</li>
                <li>Set AC temperature to efficient levels (24-26 C).</li>
                <li>Unplug chargers and devices when not in use.</li>
              </ul>
            </article>

            <article className="eco-awareness-card">
              <h3>
                <FaClipboardCheck />
                Campus Sustainability Policies
              </h3>
              <ul>
                <li>Single-use plastics are discouraged across campus zones.</li>
                <li>Monthly eco-audits are conducted block-wise.</li>
                <li>Every department must report waste reduction actions.</li>
                <li>Green volunteers support awareness drives each semester.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default EcoAwareness;
