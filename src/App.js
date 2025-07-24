import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import JobDetail from './pages/JobDetails';
import './style.css'; // Make sure the file is in src/

const App = () => {
  return (
    <Router>
      <div style={layoutStyle}>
        {/* Sidebar */}
        <aside style={sidebarStyle}>
          <h2 style={{ color: "#fff", marginBottom: "2rem" }}>📘 JobTracker</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" style={linkStyle}>📊 Dashboard</Link>
            <Link to="/add" style={linkStyle}>➕ Add Job</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={mainStyle}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddJob />} />
            <Route path="/job/:id" element={<JobDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

// Flexbox layout
const layoutStyle = {
  display: 'flex',
  minHeight: '100vh',
};

const sidebarStyle = {
  width: '220px',
  backgroundColor: '#1e2a38',
  color: '#fff',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  display: 'block',
  borderRadius: '4px',
  transition: 'background 0.3s',
  fontWeight: 'bold',
};

const mainStyle = {
  flex: 1,
  padding: '2rem',
  backgroundColor: '#f4f6f8',
};

export default App;
