import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import WaiterSidebar from './WaiterSidebar';

function WaiterDashboard({ children }) {



  return (
    <div className="d-flex">
      <WaiterSidebar/>
      <div className="p-4" style={{ flex: 1 }}>
       <Outlet/>
      </div>
      
    </div>
  );
}

export default WaiterDashboard;
