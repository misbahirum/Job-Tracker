import React, { useState, useContext } from 'react';
import { JobContext } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const { setJobs } = useContext(JobContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    status: 'Applied',
    date: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = { ...formData, id: Date.now().toString() };
    setJobs(prev => [...prev, newJob]);
    navigate('/');
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: '1.5rem' }}>➕ Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="🏢 Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="💼 Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Applied">📨 Applied</option>
          <option value="Interviewing">🤝 Interviewing</option>
          <option value="Offer">🎉 Offer</option>
          <option value="Rejected">❌ Rejected</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="📝 Notes (optional)"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJob;
