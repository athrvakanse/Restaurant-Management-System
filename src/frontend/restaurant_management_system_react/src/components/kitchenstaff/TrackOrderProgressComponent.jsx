import React, { useEffect, useState } from "react";
import axios from "axios";

function TrackOrderProgressComponent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, orderDetailsRes] = await Promise.all([
          axios.get("http://localhost:8083/api2/orders/all"),
          axios.get("http://localhost:8083/api2/orderdetails/all")
        ]);

        const ordersWithDetails = ordersRes.data.map(order => {
          const details = orderDetailsRes.data.filter(
            d => d.o_id.o_id === order.o_id
          );
          return { ...order, details };
        });

        setOrders(ordersWithDetails);
      } catch (error) {
        console.error("Error loading orders", error);
      }
    };

    fetchData();
  }, []);

  const getProgress = (status) => {
    switch (status) {
      case "Pending": return 25;
      case "In Progress": return 50;
      case "Ready": return 75;
      case "Completed": return 100;
      default: return 0;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Track Your Order Progress</h2>

      {/* Scrollable Section */}
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {orders.map(order => (
          <div key={order.o_id} className="card shadow p-3 mb-4">
            <div className="card-body">
              <h5 className="card-title">Order #{order.o_id}</h5>
              <p>Date: {order.date} </p>
              <p>Payment: {order.pay_mode} | Status: <strong>{order.status}</strong></p>

              {/* Progress bar */}
              <div className="progress mb-3">
                <div
                  className={`progress-bar ${order.status === "Completed" ? "bg-success" : "bg-info"}`}
                  style={{ width: `${getProgress(order.status)}%` }}
                >
                  {order.status}
                </div>
              </div>

              <h6>Items:</h6>
              <ul>
                {order.details.map((detail) => (
                  <li key={detail.od_id}>
                    {detail.qty} x {detail.d_id?.d_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackOrderProgressComponent;
