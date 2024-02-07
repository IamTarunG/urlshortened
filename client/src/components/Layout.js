

import React from 'react';
import Navbar from './Navbar';
import ShortenUrl from '../pages/ShortenUrl';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
