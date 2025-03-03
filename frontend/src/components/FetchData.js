import React, { useState } from 'react';
import axios from 'axios';

const FetchData = () => {
  const [fetchedData, setFetchedData] = useState([]);

  const handleFetch = async () => {
    const response = await axios.get('http://localhost:3000/data', { headers: { Authorization: localStorage.getItem('token') } });
    setFetchedData(response.data);
  };

  return (
    <div>
      <h2>Fetch Data</h2>
      <button onClick={handleFetch}>Fetch</button>
      <ul>
        {fetchedData.map((item, index) => <li key={index}>{item.data}</li>)}
      </ul>
    </div>
  );
};

export default FetchData;
