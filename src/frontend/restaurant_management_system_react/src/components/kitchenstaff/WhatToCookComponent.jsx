import React, { useEffect, useState } from "react";
import axios from "axios";

function KitchenOrdersComponent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersAndDetails = async () => {
      try {
        const [ordersResponse, orderDetailsResponse] = await Promise.all([
          axios.get("http://localhost:8083/api2/orders/all"),
          axios.get("http://localhost:8083/api2/orderdetails/all")
        ]);

        const ordersData = ordersResponse.data;
        const orderDetailsData = orderDetailsResponse.data;

        // Merge orders with their corresponding order details
        const merged = ordersData.map(order => {
          const relatedDetails = orderDetailsData.filter(
            detail => detail.o_id.o_id === order.o_id // backend gives orderDetail.o_id.o_id
          );

          return {
            ...order,
            details: relatedDetails
          };
        });

        setOrders(merged);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrdersAndDetails();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Kitchen Orders</h2>

      {/* Scrollable container */}
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {orders.map(order => (
          <div key={order.o_id} className="card shadow p-3 mb-4">
            <div className="card-body">
              <h5 className="card-title">
                Order #{order.o_id} - {order.u_id?.fname} {order.u_id?.lname}
              </h5>
              <p className="card-text">
                Date: {order.date} 
              </p>
              <p className="card-text">
                Payment Mode: {order.pay_mode} | Status: {order.status}
              </p>
              <h6>Dishes:</h6>
              <ul>
                {order.details.map(detail => (
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

export default KitchenOrdersComponent;
