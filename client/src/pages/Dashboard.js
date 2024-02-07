import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserUrls = () => {
  const [userUrls, setUserUrls] = useState([]);

  useEffect(() => {
    const fetchUserUrls = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://urlshortened.onrender.com/api/dashboard/urls', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserUrls(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://urlshortened.onrender.com/api/dashboard/urls/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserUrls(userUrls.filter(url => url._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => alert('Short URL copied to clipboard'))
      .catch((error) => console.error('Failed to copy short URL:', error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User URLs</h1>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2 w-1/3">Original URL</th>
            <th className="border border-gray-400 px-4 py-2">Short URL</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userUrls.map((url) => (
            <tr key={url._id}>
              <td className="border border-gray-400 px-4 py-2 break-all">{url.originalUrl}</td>
              <td className="border border-gray-400 px-4 py-2 space-x-16">
                <a href={`https://urlshortened.onrender.com/api/url/${url.shortUrl}`} target='_blank' rel="noopener noreferrer">{`https://urlshortened.onrender.com/api/url/${url.shortUrl}`}</a>
                <button
                  className="mt-2 md:mt-0 md:ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={() => copyToClipboard(`https://urlshortened.onrender.com/api/url/${url.shortUrl}`)}
                >
                  Copy
                </button>
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <Link to={`/dashboard/urls/${url._id}/edit`} className="text-blue-600 hover:underline mr-2">Edit</Link>
                <button onClick={() => handleDelete(url._id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserUrls;
