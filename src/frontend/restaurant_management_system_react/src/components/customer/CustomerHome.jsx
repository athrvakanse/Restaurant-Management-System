import React from 'react';
import { useSelector } from 'react-redux';

function CustomerHome() {
  const user = useSelector((state) => state.loggedInUser.user);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome to the Customer Dashboard</h2>
      <p className="text-center mt-3">
        Hello, {user?.fname || 'Customer'}! You are now logged in as a customer.
      </p>
    </div>
  );
}

export default CustomerHome;
