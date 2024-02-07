// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ShortenUrl from './pages/ShortenUrl';
import UpdateUserUrl from './pages/UpdateUserUrl';
import Analytics from './pages/Analytics';
import Home from './pages/Home';


function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/shorturl" element={<ShortenUrl/>} />
            <Route exact path="/dashboard/urls/:id/edit" element={<UpdateUserUrl/>} />
            <Route exact path="/analytics" element={<Analytics/>} />
            <Route exact path="/" element={<Home/>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
