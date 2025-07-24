import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { JobContext } from "../context/JobContext";

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Interviewing":
      return "#ffc107"; // Yellow
    case "Offer":
      return "#28a745"; // Green
    case "Rejected":
      return "#dc3545"; // Red
    default:
      return "#007bff"; // Blue (Applied)
  }
};

const Dashboard = () => {
  const { jobs, setJobs } = useContext(JobContext);

  const handleExport = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "job_applications.json";
    a.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedJobs = JSON.parse(event.target.result);
        if (Array.isArray(importedJobs)) {
          setJobs(importedJobs);
          alert("Jobs imported successfully!");
        } else {
          alert("Invalid file format.");
        }
      } catch {
        alert("Failed to parse JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <h2 className="dashboard-title">💼 Job Tracker Dashboard</h2>

      {/* Export / Import Buttons */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button className="view-button" onClick={handleExport}>
          ⬇️ Export Jobs
        </button>

        <label className="view-button" style={{ cursor: "pointer" }}>
          ⬆️ Import Jobs
          <input type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
        </label>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          No jobs added yet. Click <strong>Add Job</strong> to get started!
        </div>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div
              className="job-card"
              key={job.id}
              style={{
                borderLeft: `6px solid ${getStatusBadgeColor(job.status)}`,
              }}
            >
              <div className="job-header">
                <h3 className="job-title">
                  {job.title} @ <strong>{job.company}</strong>
                </h3>
                <span
                  className="job-badge"
                  style={{ backgroundColor: getStatusBadgeColor(job.status) }}
                >
                  {job.status}
                </span>
              </div>

              <p className="job-info">
                <strong>Date:</strong> {job.date || "N/A"}
              </p>
              <p className="job-info">
                <strong>Notes:</strong> {job.notes || "—"}
              </p>

              {/* View + Delete Buttons */}
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <Link to={`/job/${job.id}`} className="view-button">
                  View Details →
                </Link>
                <button
                  className="delete-button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this job?")) {
                      const updatedJobs = jobs.filter((j) => j.id !== job.id);
                      setJobs(updatedJobs);
                    }
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
