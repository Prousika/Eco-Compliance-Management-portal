import { useEffect, useMemo, useState } from "react";
import {
  WORKFLOW_OPTIONS,
  WORKER_DEPARTMENTS,
  addInternalNote,
  getWorkersByDepartment,
  getAdminReports,
  updateReportMeta,
  updateReportStatus,
} from "./adminUtils";
import { CAMPUS_BLOCKS, normalizeCampusBlock } from "../../utils/campusBlocks";

const PAGE_SIZE = 6;

const AdminManageIssuesPage = () => {
  const [reports, setReports] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [blockFilter, setBlockFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const sync = async () => {
      try {
        setReports(await getAdminReports());
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load reports.");
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
  const blocks = useMemo(() => ["All", ...CAMPUS_BLOCKS], []);

  const filtered = reports.filter((report) => {
    const statusOk = statusFilter === "All" || report.status === statusFilter;
    const categoryValue = report.category || report.type || "General";
    const categoryOk = categoryFilter === "All" || categoryValue === categoryFilter;
    const blockValue = normalizeCampusBlock(report.block || report.location?.split("-")[0]?.trim() || "");
    const blockOk = blockFilter === "All" || blockValue === blockFilter;
    const q = search.trim().toLowerCase();
    const searchOk =
      !q ||
      report.reportNumber.toLowerCase().includes(q) ||
      String(report.type).toLowerCase().includes(q);
    return statusOk && categoryOk && blockOk && searchOk;
  });

  useEffect(() => {
    setPage(1);
  }, [statusFilter, categoryFilter, blockFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedReports = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const selected = filtered.find((item) => item.reportNumber === selectedId) || null;

  const applyMetaUpdate = async (reportNumber, patch) => {
    try {
      setReports(await updateReportMeta(reportNumber, patch));
      setError("");
    } catch (err) {
      setError(err.message || "Unable to update report.");
    }
  };

  const submitNote = async () => {
    if (!selected || !noteInput.trim()) return;
    try {
      setReports(await addInternalNote(selected.reportNumber, noteInput));
      setNoteInput("");
      setError("");
    } catch (err) {
      setError(err.message || "Unable to save note.");
    }
  };

  const deptWorkers = selected ? getWorkersByDepartment(selected.department || "Unassigned") : [];

  const assignWorker = (worker) => {
    if (!selected) return;
    applyMetaUpdate(selected.reportNumber, {
      ecoMember: worker.name,
      assigneeContact: worker.phone,
    });
  };

  return (
    <section className="admin-content-v2">
      <div className="admin-title-v2">
        <h1>Manage Reports</h1>
        <p>Filter, assign, update status, and maintain internal resolution notes.</p>
      </div>
      {error ? <p className="auth-alert auth-alert-error">{error}</p> : null}

      <div className="admin-card-v2">
        <div className="table-top-v2">
          <h2>Issue Queue</h2>
          <div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">Status</option>
              {WORKFLOW_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select value={blockFilter} onChange={(e) => setBlockFilter(e.target.value)}>
              {blocks.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <input
              type="text"
              placeholder="Search by Report ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <table className="admin-table-v2">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Block</th>
              <th>Status</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReports.map((report) => (
              <tr key={report.reportNumber}>
                <td>{report.reportNumber}</td>
                <td>{report.type}</td>
                <td>{report.category || report.type}</td>
                <td>{report.block || report.location?.split("-")[0]}</td>
                <td>
                  <select
                    value={report.status}
                    onChange={async (e) => {
                      try {
                        setReports(await updateReportStatus(report.reportNumber, e.target.value));
                        setError("");
                      } catch (err) {
                        setError(err.message || "Unable to update status.");
                      }
                    }}
                  >
                    {WORKFLOW_OPTIONS.map((status) => (
                      <option key={`${report.reportNumber}-${status}`} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="dept-select-v2"
                    value={report.department || "Unassigned"}
                    onChange={(e) =>
                      applyMetaUpdate(report.reportNumber, {
                        department: e.target.value,
                      })
                    }
                  >
                    {WORKER_DEPARTMENTS.map((dept) => (
                      <option key={`${report.reportNumber}-${dept}`} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button type="button" onClick={() => setSelectedId(report.reportNumber)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-row-v2">
          <p>
            Showing {(filtered.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0)}-
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} reports
          </p>
          <div className="pagination-actions-v2">
            <button type="button" onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} / {totalPages}</span>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selected ? (
        <div className="admin-card-v2">
          <h2>Report Details: {selected.reportNumber}</h2>
          <p className="dept-preview-v2">
            Current Department:
            <span>{selected.department || "Unassigned"}</span>
          </p>
          <div className="admin-grid-2">
            <div>
              <p><strong>Issue:</strong> {selected.type}</p>
              <p><strong>Location:</strong> {selected.location}</p>
              <p><strong>Description:</strong> {selected.description}</p>
              <label>
                Assign Department
                <select
                  className="dept-select-v2 dept-select-lg-v2"
                  value={selected.department || "Unassigned"}
                  onChange={(e) =>
                    applyMetaUpdate(selected.reportNumber, {
                      department: e.target.value,
                      assignedWorker: e.target.value,
                    })
                  }
                >
                  {WORKER_DEPARTMENTS.map((dept) => (
                    <option key={`detail-${dept}`} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Assign Eco Cell Member
                <input
                  type="text"
                  value={selected.ecoMember || ""}
                  onChange={(e) =>
                    applyMetaUpdate(selected.reportNumber, {
                      ecoMember: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Assigned Contact
                <input
                  type="text"
                  value={selected.assigneeContact || ""}
                  onChange={(e) =>
                    applyMetaUpdate(selected.reportNumber, {
                      assigneeContact: e.target.value,
                    })
                  }
                />
              </label>

              <div className="worker-directory-v2">
                <h3 className="section-subtitle-v2">
                  {selected.department || "Unassigned"} Team Contacts
                </h3>
                {deptWorkers.length ? (
                  <ul>
                    {deptWorkers.map((worker) => (
                      <li key={`${selected.department}-${worker.phone}`}>
                        <div>
                          <strong>{worker.name}</strong>
                          <p>{worker.role}</p>
                          <a href={`tel:${worker.phone.replaceAll(" ", "")}`}>{worker.phone}</a>
                        </div>
                        <button type="button" onClick={() => assignWorker(worker)}>
                          Assign
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-line-v2">No worker contacts configured for this department.</p>
                )}
              </div>
            </div>
            <div>
              <label>
                Add Internal Note
                <textarea
                  rows="4"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Write internal resolution notes..."
                />
              </label>
              <button type="button" onClick={submitNote}>Save Note</button>
              <pre className="note-box-v2">{selected.internalNotes || "No internal notes yet."}</pre>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default AdminManageIssuesPage;
