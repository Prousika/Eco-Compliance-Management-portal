import { useEffect, useState } from "react";
import {
  getRegisteredUsers,
  toggleUserDisabled,
  toggleUserVolunteer,
} from "./adminUtils";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const sync = async () => {
      try {
        setUsers(await getRegisteredUsers());
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load users.");
      }
    };
    sync();
    window.addEventListener("eco-reports-changed", sync);
    return () => {
      window.removeEventListener("eco-reports-changed", sync);
    };
  }, []);

  return (
    <section className="admin-content-v2">
      <div className="admin-title-v2">
        <h1>User Management</h1>
        <p>View registered students, disable misuse accounts, and promote eco volunteers.</p>
      </div>
      {error ? <p className="auth-alert auth-alert-error">{error}</p> : null}

      <div className="admin-card-v2">
        <table className="admin-table-v2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Reports Raised</th>
              <th>Account State</th>
              <th>Eco Volunteer</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name || "User"}</td>
                <td>{user.email}</td>
                <td>{user.phone || "-"}</td>
                <td>{user.reportCount}</td>
                <td>
                  <button
                    type="button"
                    className={user.disabled ? "active" : ""}
                    onClick={async () => {
                      try {
                        setUsers(await toggleUserDisabled(user.id));
                        setError("");
                      } catch (err) {
                        setError(err.message || "Unable to update user.");
                      }
                    }}
                  >
                    {user.disabled ? "Disabled" : "Active"}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={user.volunteer ? "active" : ""}
                    onClick={async () => {
                      try {
                        setUsers(await toggleUserVolunteer(user.id));
                        setError("");
                      } catch (err) {
                        setError(err.message || "Unable to update user.");
                      }
                    }}
                  >
                    {user.volunteer ? "Volunteer" : "Promote"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminUsersPage;
