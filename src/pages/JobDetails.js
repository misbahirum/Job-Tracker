import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { JobContext } from '../context/JobContext';

const JobDetail = () => {
  const { id } = useParams();
  const { jobs } = useContext(JobContext);
  const job = jobs.find(job => job.id === id);

  if (!job) {
    return (
      <div className="container">
        <h2 style={{ color: '#c0392b' }}>❗ Job Not Found</h2>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={buttonStyle}>← Back to Dashboard</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>📄 Job Details</h2>
      <div className="job-card" style={cardStyle}>
        <h3 style={{ marginBottom: '0.5rem' }}>{job.title} <span style={{ color: '#3498db' }}>@ {job.company}</span></h3>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Applied on:</strong> {job.date || 'N/A'}</p>
        {job.notes && (
          <div>
            <strong>Notes:</strong>
            <p style={{ whiteSpace: 'pre-wrap', marginTop: '0.25rem' }}>{job.notes}</p>
          </div>
        )}
      </div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={buttonStyle}>← Back to Dashboard</button>
      </Link>
    </div>
  );
};

const cardStyle = {
  padding: '1.5rem',
  backgroundColor: '#fdfdfd',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  marginBottom: '1.5rem',
  color: '#333',
};

const buttonStyle = {
  backgroundColor: '#0c2f55',
  color: 'white',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default JobDetail;
