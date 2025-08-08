import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To extract userId from the URL

function TrackOrderComponent() {
  const { userId } = useParams(); // Get userId from the URL
  console.log(userId); 
  // const user = useSelector((state) => state.auth?.user); // Get logged-in user from Redux
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders for the given userId
        // const response = await axios.get(`http://localhost:8081/api/orders/trackuser/${loggedInUser.u_id}`);
        // setOrders(response.data); // Store the fetched orders in state
        // setLoading(false); // Stop loading once orders are fetched

        fetch(`http://localhost:8081/api/orders/trackuser/${userId}`).then(data=>data.json()).then(res=>{
            setOrders(res);
            setLoading(false)
      })
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchOrders(); // Fetch the orders when the component mounts
  }, [userId]); // Re-run this effect when the userId changes

  const getProgress = (status) => {
    // Determine the progress percentage based on order status
    switch (status) {
      case "Pending":
        return 25;
      case "In Progress":
        return 50;
      case "Ready":
        return 75;
      case "Completed":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Track Your Order Progress</h2>

      {/* Scrollable Section */}
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {loading ? (
          <p>Loading orders...</p> // Show loading message while fetching orders
        ) : orders.length === 0 ? (
          <p>No orders found.</p> // Show message if no orders are available
        ) : (
          orders.map((order) => (
            <div key={order.o_id} className="card shadow p-3 mb-4">
              <div className="card-body">
                <h5 className="card-title">Order #{order.o_id}</h5>
                <p>
                  <strong>Date:</strong> {order.date} | <strong>Time:</strong>{" "}
                  {order.localDateTime || "--"}
                </p>
                <p>
                  <strong>Payment:</strong> {order.payMode} | <strong>Status:</strong>{" "}
                  <strong>{order.status}</strong>
                </p>

                {/* Progress bar */}
                <div className="progress mb-3">
                  <div
                    className={`progress-bar ${
                      order.status === "Completed" ? "bg-success" : "bg-info"
                    }`}
                    style={{ width: `${getProgress(order.status)}%` }}
                  >
                    {order.status}
                  </div>
                </div>

                {/* Items */}
                <h6>Items:</h6>
                <ul>
                  {order.items?.map((item, index) => (
                    <li key={index}>
                      {item.quantity} x {item.dishName} (₹{item.price})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TrackOrderComponent;
