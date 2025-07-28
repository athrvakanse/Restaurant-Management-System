// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container-fluid p-0">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3">
          <div className="container">
            <NavLink className="navbar-brand fs-3 fw-bold" to="/login">🍽 RMS</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Sign Up</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="*" element={<h2 className="text-center mt-5">404 Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

