import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from "../../store/userSlice";
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const handleLogout = () => {
    dispatch(userAction.logoutUser());
    navigate("/"); // redirect to login or homepage
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm px-3 py-2 rounded"
      style={{
        backgroundColor: '#8B4513', // Brown
        borderRadius: '0 0 1rem 1rem', // Curved bottom corners
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fs-4 fw-bold"
          to="/"
          style={{ color: '#FFA500' }} // Yellowish-orange
        >
          🍽 RMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {!loggedInUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">Sign Up</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    Welcome, {loggedInUser.fname}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-light btn-sm ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
