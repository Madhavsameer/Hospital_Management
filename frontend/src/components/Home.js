import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUsername(storedUser);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => navigate('/store')}>📂 Store Data</li>
          <li onClick={() => navigate('/fetch')}>📜 Fetch Data</li>
          <li onClick={() => navigate('/backup')}>🗂 Backup</li>
          <li onClick={() => navigate('/restore')}>🔄 Restore</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="navbar">
          <span className="brand">🏥 Healthcare Management</span>
          <span className="user-info">👤 {username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>

        <h1>Welcome to Healthcare Management System, {username}!</h1>

        <div className="card-container">
          <div className="card">
            <h3>📂 Store Patient Data</h3>
            <button onClick={() => navigate('/store')}>Go</button>
          </div>
          <div className="card">
            <h3>📜 Fetch Patient Data</h3>
            <button onClick={() => navigate('/fetch')}>Go</button>
          </div>
          <div className="card">
            <h3>🗂 Create Backup</h3>
            <button onClick={() => navigate('/backup')}>Go</button>
          </div>
          <div className="card">
            <h3>🔄 Restore Backup</h3>
            <button onClick={() => navigate('/restore')}>Go</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
