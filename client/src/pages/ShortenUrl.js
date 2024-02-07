// ShortenUrl.js

import React, { useState } from 'react';
import axios from 'axios';

const ShortenUrl = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/shorten', { originalUrl }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Shorten URL</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input type="text" placeholder="Enter URL" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} className="w-full p-2 rounded-md border border-gray-300 mb-4" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Shorten</button>
        </form>
        {shortUrl && <a className="mt-4" href={`http://localhost:5000/api/url/${shortUrl}`}>Shortened URL: {shortUrl}</a>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ShortenUrl;
