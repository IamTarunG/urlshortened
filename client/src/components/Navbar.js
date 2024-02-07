

import React from 'react';
import { Link , useNavigate} from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/')
  };

  const isLoggedIn = localStorage.getItem('token'); // Check if token is present in local storage

  return (
        
            <div>
                <nav className="bg-gray-800 p-4">
                  <div className="container mx-auto flex justify-between items-center">
                    <div>
                      <Link to="/" className="text-white text-xl font-bold">URL shortener </Link>
                    </div>
                    <div>
                      {isLoggedIn ? (
                        <div className='flex min-w-80 justify-evenly'>
                        <Link to="/shorturl" className="text-white hover:text-gray-300">Short URL</Link>
                        <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
                        <Link to="/analytics" className="text-white hover:text-gray-300">Analytics</Link>
                        <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
                        </div>
                      ) : (
                        <ul className="flex space-x-4">
                          <li>
                            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                          </li>
                          <li>
                            <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </nav>
            </div>
  
        
    
  );
};

export default Navbar;
