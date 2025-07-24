import React, { useContext, useState, useEffect } from 'react';
import { JobContext } from '../context/JobContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditJob = () => {
  const { id } = useParams();
  const { jobs, setJobs } = useContext(JobContext);
  const navigate = useNavigate();

  const jobToEdit = jobs.find(job => job.id === id);

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    status: '',
    date: '',
    notes: ''
  });

  useEffect(() => {
    if (jobToEdit) {
      setFormData({ ...jobToEdit });
    }
  }, [jobToEdit]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJobs = jobs.map(job =>
      job.id === id ? { ...formData } : job
    );
    setJobs(updatedJobs);
    navigate('/');
  };

  if (!jobToEdit) {
    return (
      <div className="container">
        <h2 style={{ color: '#c0392b' }}>❌ Job Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '1.5rem' }}>✏️ Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit">✅ Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;
