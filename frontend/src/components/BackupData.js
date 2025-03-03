import React from 'react';
import axios from 'axios';

const BackupData = () => {
  const handleBackup = async () => {
    await axios.get('http://localhost:3000/backup', { headers: { Authorization: localStorage.getItem('token') } });
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
