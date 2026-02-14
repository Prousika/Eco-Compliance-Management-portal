import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import { getReports } from "../utils/reportStore";

const BLOCK_COORDS = {
  "Block A": { lat: 11.2342, lng: 77.1044, zone: "North Campus Zone" },
  "Block B": { lat: 11.2312, lng: 77.1069, zone: "Central Campus Zone" },
  "Block C": { lat: 11.2361, lng: 77.1081, zone: "North Campus Zone" },
  "IB Block": { lat: 11.2291, lng: 77.1062, zone: "Central Campus Zone" },
  "Playground Area": { lat: 11.2278, lng: 77.1048, zone: "South Campus Zone" },
  "Academic Block A": { lat: 11.2331, lng: 77.1051, zone: "Central Campus Zone" },
  "Library Block": { lat: 11.2301, lng: 77.1027, zone: "Central Campus Zone" },
  "Sports Complex": { lat: 11.2266, lng: 77.1092, zone: "South Campus Zone" },
  "Hostel Block": { lat: 11.2248, lng: 77.1058, zone: "South Campus Zone" },
};

const STATUS_MARKER_ICON = {
  Pending: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  Reopened: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  "In Progress": "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  Resolved: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
};

const pickBlock = (report) => report.block || report.location?.split("-")[0]?.trim() || "Block B";

const Transparencymap = () => {
  const center = { lat: 11.2321, lng: 77.1067 };
  const [reports, setReports] = useState(() => getReports());
  const [selectedIssue, setSelectedIssue] = useState(null);

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

  const mappedIssues = useMemo(
    () =>
      reports.map((report, index) => {
        const block = pickBlock(report);
        const coords = BLOCK_COORDS[block] || {
          lat: 11.2315 + index * 0.0006,
          lng: 77.106 + index * 0.0005,
          zone: "Campus Zone",
        };

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

        <div className="eco-map-layout">
          <div className="eco-map-wrap">
            <LoadScript googleMapsApiKey="AIzaSyAg-DiGUEFgQYZYT2zgQ1JInN7vlx7O4cY">
              <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={15}
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
