import React, { useEffect, useState } from "react";
import axios from "axios";

function UpdateOrderStatusComponent() {
  const [orders, setOrders] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});

  // Fetch orders on load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api2/orders/all");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle dropdown change
  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates(prev => ({ ...prev, [orderId]: newStatus }));
  };

  // Handle status update submit
  const handleUpdateStatus = async (orderId) => {
    try {
      const newStatus = statusUpdates[orderId];
      await axios.put(`http://localhost:8080/api2/orders/update/${orderId}`, {
        status: newStatus
      });

      alert("Order status updated successfully");

      // Optional: refresh orders
      const refreshed = await axios.get("http://localhost:8080/api2/orders/all");
      setOrders(refreshed.data);
      setStatusUpdates(prev => ({ ...prev, [orderId]: "" }));
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Order Status</h2>

      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {orders.map(order => (
          <div key={order.o_id} className="card shadow p-3 mb-3">
            <div className="card-body">
              <h5 className="card-title">Order #{order.o_id}</h5>
              <p>User: {order.u_id?.fname} {order.u_id?.lname}</p>
              <p>Current Status: <strong>{order.status}</strong></p>

              {/* Dropdown to select new status */}
              <select
                className="form-select mb-2"
                value={statusUpdates[order.o_id] || ""}
                onChange={(e) => handleStatusChange(order.o_id, e.target.value)}
              >
                <option value="">-- Select New Status --</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Ready">Ready</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                className="btn btn-primary"
                onClick={() => handleUpdateStatus(order.o_id)}
                disabled={!statusUpdates[order.o_id]}
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdateOrderStatusComponent;
