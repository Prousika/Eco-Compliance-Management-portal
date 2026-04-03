import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import {
  WORKFLOW_OPTIONS,
  getAdminReports,
  getZoneMaintenance,
  toggleZoneMaintenance,
  updateReportStatus,
} from "./adminUtils";
import {
  BAIET_CAMPUS_CENTER,
  BAIET_MAP_OPTIONS,
  getCampusPoint,
} from "../../utils/campusMap";

const pinStatus = (status) => {
  if (status === "Resolved") return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
  if (status === "In Progress") return "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
  return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
};

const AdminTransparencyMapPage = () => {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [maintenance, setMaintenance] = useState(() => getZoneMaintenance());
  const [error, setError] = useState("");

  useEffect(() => {
    const sync = async () => {
      try {
        setReports(await getAdminReports());
        setMaintenance(getZoneMaintenance());
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load map data.");
      }
    };
    sync();
    window.addEventListener("eco-reports-changed", sync);
    return () => window.removeEventListener("eco-reports-changed", sync);
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(reports.map((item) => item.category || item.type || "General"))],
    [reports]
  );

  const filteredReports = reports.filter((item) => {
    if (categoryFilter === "All") return true;
    return (item.category || item.type || "General") === categoryFilter;
  });

  const points = useMemo(
    () =>
      filteredReports.map((report, index) => {
        const block = report.block || report.location?.split("-")[0]?.trim() || "Block B";
        const coords =
          typeof report.latitude === "number" && typeof report.longitude === "number"
            ? { lat: report.latitude, lng: report.longitude, zone: getCampusPoint(block, index).zone }
            : getCampusPoint(block, index);
        return { ...report, block, ...coords };
      }),
    [filteredReports]
  );

  const zoneCounts = useMemo(() => {
    const grouped = points.reduce((acc, item) => {
      acc[item.zone] = (acc[item.zone] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped).map(([zone, count]) => ({ zone, count })).sort((a, b) => b.count - a.count);
  }, [points]);

  return (
    <section className="admin-content-v2">
      <div className="admin-title-v2">
        <h1>Transparency Map Control</h1>
        <p>Heatmap-style zone load, category filters, and maintenance control.</p>
      </div>
      {error ? <p className="auth-alert auth-alert-error">{error}</p> : null}

      <div className="admin-card-v2">
        <div className="table-top-v2">
          <h2>Map Controls</h2>
          <div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card-v2">
          <LoadScript googleMapsApiKey="AIzaSyAg-DiGUEFgQYZYT2zgQ1JInN7vlx7O4cY">
            <GoogleMap
              mapContainerClassName="admin-map-canvas"
              center={BAIET_CAMPUS_CENTER}
              zoom={16}
              options={BAIET_MAP_OPTIONS}
            >
              {points.map((point) => (
                <Marker
                  key={point.reportNumber}
                  position={{ lat: point.lat, lng: point.lng }}
                  icon={pinStatus(point.status)}
                  onClick={() => setSelected(point)}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>

        <div className="admin-card-v2">
          <h2>Issue Detail / Status</h2>
          {selected ? (
            <div className="map-detail-v2">
              <p><strong>Report:</strong> {selected.reportNumber}</p>
              <p><strong>Issue:</strong> {selected.type}</p>
              <p><strong>Zone:</strong> {selected.zone}</p>
              <select
                value={selected.status}
                onChange={async (e) => {
                  try {
                    setReports(await updateReportStatus(selected.reportNumber, e.target.value));
                    setSelected((prev) => (prev ? { ...prev, status: e.target.value } : prev));
                    setError("");
                  } catch (err) {
                    setError(err.message || "Unable to update status.");
                  }
                }}
              >
                {WORKFLOW_OPTIONS.map((status) => (
                  <option key={`selected-${status}`} value={status}>{status}</option>
                ))}
              </select>
            </div>
          ) : (
            <p className="empty-line-v2">Click marker to update status.</p>
          )}

          <h3 className="section-subtitle-v2">Zone-wise Issue Count (Heatmap Data)</h3>
          <div className="zone-grid-v2">
            {zoneCounts.map((zone) => (
              <div key={zone.zone} className="zone-card-v2">
                <strong>{zone.zone}</strong>
                <p>{zone.count} issues</p>
                <button
                  type="button"
                  className={maintenance[zone.zone] ? "active" : ""}
                  onClick={() => setMaintenance(toggleZoneMaintenance(zone.zone))}
                >
                  {maintenance[zone.zone] ? "Under Maintenance" : "Mark Under Maintenance"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminTransparencyMapPage;
