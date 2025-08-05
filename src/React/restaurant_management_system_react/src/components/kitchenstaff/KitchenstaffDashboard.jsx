import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function KitchenstaffDashboard() {
  const user = useSelector((state) => state.loggedInUser.user);

  return (
   <div className="d-flex">
      <ManagerSidebar/>
      <div className="p-4" style={{ flex: 1 }}>
       <Outlet/>
      </div>
    </div>
  );
}

export default KitchenstaffDashboard;
