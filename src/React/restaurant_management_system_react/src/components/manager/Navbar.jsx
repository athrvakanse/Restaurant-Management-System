import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {
    
  const loggedInUser = useSelector((state) => state.loggedInUser?.user);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3">
          <div className="container">
            <Link className="navbar-brand fs-3 fw-bold" to="/login">🍽 RMS</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                {!loggedInUser ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Sign Up</Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <span className="nav-link disabled">
                      Welcome, {loggedInUser.fname}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
  )
}

export default Navbar