import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to URL Shortener</h1>
      {isLoggedIn ? (
        
        <p className='text-2xl'>Please navigate to <Link to={'/shorturl'} className='underline'>Short URL</Link></p>
      ) : (
        <div>
          <p>Please sign up or log in to access the features of the URL shortener.</p>
          <div className="mt-4">
            <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            <span className="mx-2">or</span>
            <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
