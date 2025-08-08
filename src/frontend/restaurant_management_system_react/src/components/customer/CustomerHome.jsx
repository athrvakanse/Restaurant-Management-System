import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';  // Import Outlet from react-router-dom

import { useSelector } from "react-redux"; // To access logged-in user details

function CustomerHome() {
  const user = useSelector((state) => state.auth?.user); // Get logged-in user from Redux
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state
  const loggedInUser = useSelector(store=>store.loggedInUser)
  console.log(loggedInUser)
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return; // If no logged-in user, do nothing
      try {
        // Fetch orders for the logged-in user using user ID
        const response = await axios.get(`http://localhost:8081/api/orders/user/${user.u_id}`);
        setOrders(response.data); // Store the fetched orders in state
        setLoading(false); // Stop loading once orders are fetched
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchOrders(); // Fetch orders when the component mounts
  }, [user]); // Re-run this effect when the user changes

  return (
    <div className="container mt-4">
      <h2>Welcome, {user?.fname || "Customer"} 👋</h2>

      <div className="row mt-4">
        {/* Sidebar Navigation */}
        <div className="col-md-3">
          <div className="list-group">
            <Link to="/customer/home/viewdishes" className="list-group-item list-group-item-action">
              🍽️ View All Dishes
            </Link>
            <Link to="/customer/home/reservations/view" className="list-group-item list-group-item-action">
              📅 View My Reservations
            </Link>
            <Link to="/customer/home/reservations/create" className="list-group-item list-group-item-action">
              ➕ Create Reservation
            </Link>
                 <Link to={`/customer/home/orders/trackuser/${loggedInUser.u_id}`} className="list-group-item list-group-item-action">
              📦 Track My Orders
            </Link>
                </div>
          </div>
        </div>

        {/* Main Content for Child Routes */}
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
  );
}

export default CustomerHome;
