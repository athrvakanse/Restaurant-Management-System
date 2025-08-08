import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ManagerSidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="bg-light border-end p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h5 className="text-dark fw-bold text-center mb-4">Manager Panel</h5>

      {/* Role Dropdown */}
      <div className="mb-3">
        <button
          className="btn btn-outline-dark w-100 text-start"
          onClick={() => toggleDropdown('role')}
        >
          Role
        </button>
        {openDropdown === 'role' && (
          <ul className="list-group list-group-flush">
            <li><Link to="/manager/dashboard/role/add" className="list-group-item">Add Role</Link></li>
            <li><Link to="/manager/dashboard/role/view" className="list-group-item">View Role</Link></li>
          </ul>
        )}
      </div>

      {/* Menu Dropdown */}
      <div className="mb-3">
        <button
          className="btn btn-outline-dark w-100 text-start"
          onClick={() => toggleDropdown('menu')}
        >
          Menu
        </button>
        {openDropdown === 'menu' && (
          <ul className="list-group list-group-flush">
            <li><Link to="/manager/dashboard/category/add" className="list-group-item">Add Category</Link></li>
            <li><Link to="/manager/dashboard/category/view" className="list-group-item">View Category</Link></li>
          </ul>
        )}
      </div>

      {/* User Dropdown */}
      <div className="mb-3">
        <button
          className="btn btn-outline-dark w-100 text-start"
          onClick={() => toggleDropdown('user')}
        >
          User
        </button>
        {openDropdown === 'user' && (
          <ul className="list-group list-group-flush">
            <li><Link to="/manager/dashboard/users/managers" className="list-group-item">View Managers</Link></li>
            <li><Link to="/manager/dashboard/users/waiters" className="list-group-item">View Waiters</Link></li>
            <li><Link to="/manager/dashboard/users/kitchenstaff" className="list-group-item">View Kitchen Staff</Link></li>
            <li><Link to="/manager/dashboard/users/customers" className="list-group-item">View Customers</Link></li>
          </ul>
        )}
      </div>

      {/* Report Button */}
      <div className="mt-4">
        <Link to="/manager/dashboard/report" className="btn btn-info w-100">
          View Report
        </Link>
      </div>
    </div>
  );
}

export default ManagerSidebar;
