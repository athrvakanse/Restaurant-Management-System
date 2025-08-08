import React from 'react';
import { NavLink } from 'react-router-dom';

function KitchenstaffSidebar() {
  return (
    <div className="bg-light text-dark vh-100 border-end" style={{ width: '250px' }}>
      <div className="p-3">
        <h4 className="text-center">Kitchen Staff</h4>
        <hr className="bg-secondary" />

        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to="/kitchenstaff/dashboard/what-to-cook"
              className="nav-link text-dark"
              activeClassName="active"
            >
              🍽️ What to Cook
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/kitchenstaff/dashboard/track-progress"
              className="nav-link text-dark"
              activeClassName="active"
            >
              🔄 Track Progress
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/kitchenstaff/dashboard/update-status"
              className="nav-link text-dark"
              activeClassName="active"
            >
              ✔️ Update Status
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default KitchenstaffSidebar;
