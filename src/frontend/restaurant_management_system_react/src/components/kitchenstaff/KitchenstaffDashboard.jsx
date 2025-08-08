import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import KitchenstaffSidebar from './KitchenstaffSidebar';

function KitchenstaffDashboard() {
  const user = useSelector((state) => state.loggedInUser?.user);

  return (
    <div className="d-flex">
      <KitchenstaffSidebar />
      <div className="p-4" style={{ flex: 1 }}>
        <h4 className="mb-4">Welcome, {user?.fname || "Kitchen Staff"}!</h4>
        <Outlet />
      </div>
    </div>
  );
}

export default KitchenstaffDashboard;
