import Header from "./Header";
import {
  FaChevronRight,
  FaRegFileAlt,
  FaRegImage,
  FaSearch,
} from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { getReports } from "../utils/reportStore";
import "./Checkstatus.css";

const Checkstatus = () => {
  const [reports, setReports] = useState(() => getReports());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReportNumber, setSelectedReportNumber] = useState(
    reports[0]?.reportNumber || ""
  );

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

  const filteredReports = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return reports;
    }

    return reports.filter((report) =>
      report.reportNumber.toLowerCase().includes(normalizedQuery)
    );
  }, [searchQuery]);

  const selectedReport =
    reports.find((report) => report.reportNumber === selectedReportNumber) ||
    filteredReports[0] ||
    reports[0] ||
    null;

  return (
    <>
      <Header />
      <div className="check-status-page">
        <div className="check-status-shell">
          <div className="check-status-browser">
            <span />
            <span />
            <span />
          </div>

          <section className="check-status-panel">
            <div className="check-status-title">
              <h1>
                <FaRegFileAlt />
                Report Status Dashboard
              </h1>
              <p>Track progress and details of your report</p>
            </div>

            <div className="check-status-search">
              <input
                type="text"
                placeholder="Enter Report Number (e.g. RPT-89011)"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button type="button" aria-label="Search report number">
                <FaSearch />
                Search
              </button>
            </div>

            <div className="check-status-card">
              <h2>Your Recent Reports</h2>
              <div className="check-status-table-wrap">
                <table className="check-status-table">
                  <thead>
                    <tr>
                      <th>Report No.</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>Progress</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.map((report) => (
                      <tr key={`${report.date}-${report.type}`}>
                        <td>{report.reportNumber}</td>
                        <td>{report.date}</td>
                        <td>{report.type}</td>
                        <td>
                          <span className={`pill pill-${report.tone}`}>
                            {report.status}
                          </span>
                        </td>
                        <td>
                          <span className={`pill pill-${report.tone}`}>
                            {report.progress}%
                          </span>
                        </td>
                        <td>
                          <div className="row-progress">
                            <span style={{ width: `${report.progress}%` }} />
                          </div>
                          <FaChevronRight />
                        </td>
                        <td className="view-cell">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedReportNumber(report.reportNumber)
                            }
                          >
                            View
                            <FaChevronRight />
                          </button>
                          <FaChevronRight />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!filteredReports.length && (
                  <p className="empty-results">
                    No reports found for "{searchQuery}".
                  </p>
                )}
              </div>
            </div>

            {selectedReport ? (
              <div className="check-status-card">
                <h2>Report Details: {selectedReport.reportNumber}</h2>

                <div className="details-grid">
                  <div className="details-main">
                    <table className="detail-summary-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Location</th>
                          <th>Assigned Worker</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{selectedReport.date}</td>
                          <td>{selectedReport.type}</td>
                          <td>{selectedReport.location}</td>
                          <td>{selectedReport.department || selectedReport.assignedWorker}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="detail-inline-stats">
                      <span className={`pill pill-${selectedReport.tone}`}>
                        {selectedReport.status}
                      </span>
                      <span className={`pill pill-${selectedReport.tone}`}>
                        {selectedReport.progress}%
                      </span>
                    </div>

                    <div className="detail-description">
                      <h3>Description</h3>
                      <p>{selectedReport.description}</p>
                    </div>
                  </div>

                  <aside className="details-side">
                    <h3>Updates Timeline</h3>
                    <ul>
                      {selectedReport.timeline.map((item) => (
                        <li key={`${item.date}-${item.text}`}>
                          <span>{item.date}</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="detail-attachments">
                      {selectedReport.images.map((item) => (
                        <figure key={item.name}>
                          <img src={item.src} alt={item.name} />
                          <figcaption>
                            <FaRegImage />
                            {item.name}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </>
  );
};

export default Checkstatus;
