import React, { createContext, useState, useEffect } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobList');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem('jobList', JSON.stringify(jobs));
  }, [jobs]);

  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobContext.Provider>
  );
};
