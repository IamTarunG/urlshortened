import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [urlData, setUrlData] = useState([]);

  useEffect(() => {
    const fetchUrlData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://urlshortened.onrender.com/api/dashboard/urls', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUrlData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUrlData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Analytics</h1>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            data={urlData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="shortUrl" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="bump" dataKey="clickCount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
