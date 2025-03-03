import React from 'react';
import axios from 'axios';

const BackupData = () => {
  const handleBackup = async () => {
    await axios.get('https://hospital-management-0ke7.onrender.com/backup', { headers: { Authorization: localStorage.getItem('token') } });
    alert('Backup created successfully!');
  };

  return (
    <div>
      <h2>Backup Data</h2>
      <button onClick={handleBackup}>Backup</button>
    </div>
  );
};

export default BackupData;
