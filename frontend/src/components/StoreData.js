import React, { useState } from 'react';
import axios from 'axios';

const StoreData = () => {
  const [data, setData] = useState('');

  const handleStore = async () => {
    await axios.post('https://hospital-management-0ke7.onrender.com/data', { data }, { headers: { Authorization: localStorage.getItem('token') } });
    alert('Data stored successfully!');
  };

  return (
    <div>
      <h2>Store Data</h2>
      <input placeholder="Enter Data" value={data} onChange={e => setData(e.target.value)} />
      <button onClick={handleStore}>Store</button>
    </div>
  );
};

export default StoreData;
