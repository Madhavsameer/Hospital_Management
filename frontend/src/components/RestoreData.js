import React from 'react';
import axios from 'axios';

const RestoreData = () => {
  const handleRestore = async () => {
    await axios.post('http://localhost:3000/restore', {}, { headers: { Authorization: localStorage.getItem('token') } });
    alert('Data restored successfully!');
  };

  return (
    <div>
      <h2>Restore Data</h2>
      <button onClick={handleRestore}>Restore</button>
    </div>
  );
};

export default RestoreData;
