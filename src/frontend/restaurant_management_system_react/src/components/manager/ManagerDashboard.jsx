import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ManagerSidebar from './ManagerSidebar';

function ManagerDashboard({ children }) {



  return (
    <div className="d-flex">
      <ManagerSidebar/>
      <div className="p-4" style={{ flex: 1 }}>
       <Outlet/>
      </div>
    </div>
  );
}

export default ManagerDashboard;
