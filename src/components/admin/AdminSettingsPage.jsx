import { useEffect, useState } from "react";
import {
  getAdminNotifications,
  getAdminSettings,
  pushAdminNotification,
  saveAdminSettings,
} from "./adminUtils";

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    categories: "",
    zones: "",
    adminName: "",
    adminEmail: "",
    password: "",
    passwordHint: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [campaignMsg, setCampaignMsg] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [resolvedMsg, setResolvedMsg] = useState("Your reported issue has been resolved.");
  const [saveMsg, setSaveMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [nextSettings, nextNotifications] = await Promise.all([
          getAdminSettings(),
          getAdminNotifications(),
        ]);
        setSettings(nextSettings);
        setNotifications(nextNotifications);
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load settings.");
      }
    };

    load();
  }, []);

  const save = async () => {
    try {
      await saveAdminSettings(settings);
      setSaveMsg("Settings updated.");
      setError("");
      setTimeout(() => setSaveMsg(""), 1800);
    } catch (err) {
      setError(err.message || "Unable to save settings.");
    }
  };

  const sendNotify = async (type, message) => {
    if (!message.trim()) return;
    try {
      await pushAdminNotification(type, message.trim());
      setNotifications(await getAdminNotifications());
      setError("");
    } catch (err) {
      setError(err.message || "Unable to send notification.");
    }
  };

  return (
    <section className="admin-content-v2">
      <div className="admin-title-v2">
        <h1>Settings</h1>
        <p>Manage categories, zones, admin profile, password, and notifications.</p>
      </div>
      {error ? <p className="auth-alert auth-alert-error">{error}</p> : null}

      <div className="admin-grid-2">
        <div className="admin-card-v2">
          <h2>Issue Categories & Zones</h2>
          <label>
            Categories (comma separated)
            <textarea
              rows="3"
              value={settings.categories}
              onChange={(e) => setSettings((prev) => ({ ...prev, categories: e.target.value }))}
            />
          </label>
          <label>
            Campus Zones (comma separated)
            <textarea
              rows="3"
              value={settings.zones}
              onChange={(e) => setSettings((prev) => ({ ...prev, zones: e.target.value }))}
            />
          </label>
        </div>

        <div className="admin-card-v2">
          <h2>Admin Profile & Security</h2>
          <label>
            Name
            <input
              type="text"
              value={settings.adminName}
              onChange={(e) => setSettings((prev) => ({ ...prev, adminName: e.target.value }))}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => setSettings((prev) => ({ ...prev, adminEmail: e.target.value }))}
            />
          </label>
          <label>
            Change Password
            <input
              type="password"
              value={settings.password}
              onChange={(e) => setSettings((prev) => ({ ...prev, password: e.target.value }))}
            />
          </label>
          <button type="button" onClick={save}>Save Settings</button>
          {saveMsg ? <p className="empty-line-v2">{saveMsg}</p> : null}
        </div>
      </div>

      <div className="admin-card-v2">
        <h2>Notifications</h2>
        <div className="admin-grid-2">
          <div>
            <label>
              Resolved Issue Notification
              <textarea rows="2" value={resolvedMsg} onChange={(e) => setResolvedMsg(e.target.value)} />
            </label>
            <button type="button" onClick={() => sendNotify("resolved", resolvedMsg)}>
              Notify Resolved Users
            </button>
          </div>
          <div>
            <label>
              Eco Campaign Alert
              <textarea rows="2" value={campaignMsg} onChange={(e) => setCampaignMsg(e.target.value)} />
            </label>
            <button type="button" onClick={() => sendNotify("campaign", campaignMsg)}>
              Send Campaign Alert
            </button>
          </div>
        </div>
        <label>
          Broadcast Announcement
          <textarea rows="2" value={broadcastMsg} onChange={(e) => setBroadcastMsg(e.target.value)} />
        </label>
        <button type="button" onClick={() => sendNotify("broadcast", broadcastMsg)}>
          Broadcast Announcement
        </button>

        <h3 className="section-subtitle-v2">Notification Log</h3>
        <div className="map-list-v2">
          {notifications.map((item) => (
            <div key={item.id} className="map-row-v2">
              <span>{new Date(item.at).toLocaleString()} - {item.type}</span>
              <small>{item.message}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminSettingsPage;
