import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateUserUrl = () => {
  const { id } = useParams();
  const [originalUrl, setOriginalUrl] = useState('');
  const [updatedUrl, setUpdatedUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://urlshortened.onrender.com/api/dashboard/urls/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOriginalUrl(response.data.originalUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUrl();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://urlshortened.onrender.com/api/dashboard/urls/${id}`, { updatedUrl }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOriginalUrl(updatedUrl);
      setUpdatedUrl('');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-4">Edit URL</h1>
      <p className="mb-4"><strong>Original URL:</strong> {originalUrl}</p>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={updatedUrl}
          onChange={(e) => setUpdatedUrl(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          placeholder="Enter updated URL"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2"
        >
          Update
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UpdateUserUrl;
