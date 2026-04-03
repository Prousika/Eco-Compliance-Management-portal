import { useEffect, useMemo, useState } from "react";
import { applyComplaintUpdate, getComplaints } from "../../utils/adminStore";

const AdminAssignments = () => {
  const [complaints, setComplaints] = useState(() => getComplaints());
  const [assigneeInputs, setAssigneeInputs] = useState({});

  useEffect(() => {
    const sync = () => setComplaints(getComplaints());
    window.addEventListener("eco-admin-changed", sync);
    return () => window.removeEventListener("eco-admin-changed", sync);
  }, []);

  const groups = useMemo(() => {
    const byTeam = complaints.reduce((acc, item) => {
      const key = item.team || "Unassigned";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    return Object.entries(byTeam).sort((a, b) => a[0].localeCompare(b[0]));
  }, [complaints]);

  const handleAssign = (reportNumber, fallback) => {
    const value = assigneeInputs[reportNumber] || fallback || "Unassigned";
    applyComplaintUpdate(
      reportNumber,
      {
        assignee: value,
        workflowStatus: "Assigned",
      },
      "Admin",
      `Complaint assigned to ${value}`
    );
  };

  return (
    <section className="admin-page">
      <div className="admin-panel">
        <div className="panel-head">
          <h2>Assignments Board</h2>
          <p>Team workload and reassignment control</p>
        </div>

        <div className="assignment-grid">
          {groups.map(([team, items]) => (
            <article className="assignment-card" key={team}>
              <h3>{team}</h3>
              <p>{items.length} complaints</p>
              <ul className="simple-list">
                {items.map((item) => (
                  <li key={item.reportNumber}>
                    <strong>{item.reportNumber}</strong> - {item.subject}
                    <input
                      type="text"
                      placeholder={item.assignee}
                      value={assigneeInputs[item.reportNumber] || ""}
                      onChange={(event) =>
                        setAssigneeInputs((prev) => ({
                          ...prev,
                          [item.reportNumber]: event.target.value,
                        }))
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleAssign(item.reportNumber, item.assignee)}
                    >
                      Reassign
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminAssignments;
