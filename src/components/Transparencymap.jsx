import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import { getReports } from "../utils/reportStore";
import {
  BAIET_CAMPUS_CENTER,
  BAIET_MAP_OPTIONS,
  getCampusPoint,
} from "../utils/campusMap";

const STATUS_MARKER_ICON = {
  Pending: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  Reopened: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  "In Progress": "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  Resolved: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
};

const pickBlock = (report) => report.block || report.location?.split("-")[0]?.trim() || "Block B";

const Transparencymap = () => {
  const [reports, setReports] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const syncReports = async () => {
      try {
        setReports(await getReports());
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load map data.");
      }
    };

    syncReports();
    window.addEventListener("eco-reports-changed", syncReports);
    return () => {
      window.removeEventListener("eco-reports-changed", syncReports);
    };
  }, []);

  const mappedIssues = useMemo(
    () =>
      reports.map((report, index) => {
        const block = pickBlock(report);
        const coords =
          typeof report.latitude === "number" && typeof report.longitude === "number"
            ? { lat: report.latitude, lng: report.longitude, zone: getCampusPoint(block, index).zone }
            : getCampusPoint(block, index);

        return {
          reportNumber: report.reportNumber,
          issue: report.type,
          status: report.status,
          block,
          zone: coords.zone,
          lat: coords.lat,
          lng: coords.lng,
        };
      }),
    [reports]
  );

  const areaCounts = mappedIssues.reduce((acc, item) => {
    acc[item.zone] = (acc[item.zone] || 0) + 1;
    return acc;
  }, {});

  const mostAffectedArea = Object.entries(areaCounts).sort((a, b) => b[1] - a[1])[0] || [
    "No Data",
    0,
  ];

  return (
    <>
      <Header />
      <section className="eco-map-page">
        <h1>Eco Transparency Map</h1>
        <p>
          Campus zones and block-wise eco issues with live status color coding.
        </p>
        {error ? <p className="auth-alert auth-alert-error">{error}</p> : null}

        <div className="eco-map-layout">
          <div className="eco-map-wrap">
            <LoadScript googleMapsApiKey="AIzaSyAg-DiGUEFgQYZYT2zgQ1JInN7vlx7O4cY">
              <GoogleMap
                mapContainerClassName="map-container"
                center={BAIET_CAMPUS_CENTER}
                zoom={16}
                options={BAIET_MAP_OPTIONS}
                onClick={() => setSelectedIssue(null)}
              >
                {mappedIssues.map((item) => (
                  <Marker
                    key={item.reportNumber}
                    position={{ lat: item.lat, lng: item.lng }}
                    title={`${item.reportNumber} - ${item.issue} (${item.status})`}
                    icon={STATUS_MARKER_ICON[item.status] || STATUS_MARKER_ICON.Pending}
                    onClick={() => setSelectedIssue(item)}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
            {selectedIssue ? (
              <div className="map-issue-overlay">
                <button
                  type="button"
                  className="map-issue-close"
                  onClick={() => setSelectedIssue(null)}
                  aria-label="Close complaint details"
                >
                  x
                </button>
                <h3>{selectedIssue.issue}</h3>
                <p>
                  <strong>Report:</strong> {selectedIssue.reportNumber}
                </p>
                <p>
                  <strong>Zone:</strong> {selectedIssue.zone}
                </p>
                <p>
                  <strong>Block:</strong> {selectedIssue.block}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`eco-status ${selectedIssue.status.toLowerCase().replace(" ", "-")}`}>
                    {selectedIssue.status}
                  </span>
                </p>
              </div>
            ) : null}
          </div>

          <aside className="eco-map-side">
            <div className="eco-status-legend">
              <h2>Status Legend</h2>
              <div className="legend-row">
                <span className="legend-dot pending" />
                <p>Pending / Reopened</p>
              </div>
              <div className="legend-row">
                <span className="legend-dot progress" />
                <p>In Progress</p>
              </div>
              <div className="legend-row">
                <span className="legend-dot resolved" />
                <p>Resolved</p>
              </div>
            </div>

            <div className="most-affected">
              <h2>Most Affected Campus Area</h2>
              <p>{mostAffectedArea[0]}</p>
              <span>{mostAffectedArea[1]} reported eco issues</span>
            </div>

            <div className="eco-issue-list">
              <h2>Block-wise Eco Issues</h2>
              {mappedIssues.map((item) => (
                <div key={item.reportNumber} className="eco-issue-card">
                  <h3>{item.block}</h3>
                  <p>{item.zone}</p>
                  <span>
                    {item.reportNumber} - {item.issue}
                  </span>
                  <strong className={`eco-status ${item.status.toLowerCase().replace(" ", "-")}`}>
                    {item.status}
                  </strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Transparencymap;
