import React from 'react';
import { useSelector } from 'react-redux';

function WaiterDashboard() {
  const user = useSelector((state) => state.loggedInUser.user);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome to the Waiter Dashboard</h2>
      <p className="text-center mt-3">
        Hello, {user?.fname || 'Waiter'}! You are now logged in as waiter.
      </p>
    </div>
  );
}

export default WaiterDashboard;
