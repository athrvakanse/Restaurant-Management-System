// File: src/components/customer/ViewDishesComponent.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ViewDishesComponent() {
    const loggedInUser=useSelector(store=>store.loggedInUser)
    console.log(loggedInUser)
  const [dishes, setDishes] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState({});
  const [payMode, setPayMode] = useState('CASH');

  const user = useSelector((state) => state.loggedInUser.user);
  const userId = user?.id;

  useEffect(() => {
    fetch("http://localhost:8081/api/menu")
      .then((res) => res.json())
      .then((data) => setDishes(data))
      .catch((err) => console.error("Failed to load dishes", err));
  }, []);

  const handleQtyChange = (d_id, qty) => {
    const quantity = parseInt(qty);
    if (quantity > 0) {
      setSelectedDishes((prev) => ({
        ...prev,
        [d_id]: { d_id, qty: quantity }
      }));
    } else {
      const updated = { ...selectedDishes };
      delete updated[d_id];
      setSelectedDishes(updated);
    }
  };

  const handlePlaceOrder = () => {
    const dishlist = Object.values(selectedDishes);

    // if (!userId) {
    //   alert("You must be logged in to place an order.");
    //   return;
    // }

    if (dishlist.length === 0) {
      alert("Please select at least one dish with quantity.");
      return;
    }

    const totalAmount = dishlist.reduce((sum, item) => {
      const dish = dishes.find(d => d.d_id === item.d_id);
      return sum + (dish?.rate || 0) * item.qty;
    }, 0);

    const orderInfo = {
      uid: loggedInUser.u_id,
      amount: totalAmount,
      pay_mode: payMode,
      dishlist: dishlist
    };

    console.log("Order payload: ", orderInfo); // for debugging

    axios.post("http://localhost:8081/api/orders/placeorder", orderInfo)
      .then((res) => {
        alert("✅ Order placed successfully! Order ID: " + res.data.o_id);
        setSelectedDishes({});
      })
      .catch((err) => {
        console.error("❌ Error placing order", err);
        alert("❌ Failed to place order.");
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Dishes</h2>

      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Dish ID</th>
            <th>Name</th>
            <th>Rate (₹)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.d_id}>
              <td>{dish.d_id}</td>
              <td>{dish.name}</td>
              <td>{dish.rate}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  style={{ width: '80px' }}
                  onChange={(e) => handleQtyChange(dish.d_id, e.target.value)}
                  value={selectedDishes[dish.d_id]?.qty || ''}
                />
              </td>
              <td><button onClick={handlePlaceOrder}>Place Order</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-group mt-4">
        <label><strong>Select Payment Mode:</strong></label>
        <select
          className="form-control w-25"
          value={payMode}
          onChange={(e) => setPayMode(e.target.value)}
        >
          <option value="CASH">Cash</option>
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
        </select>
      </div>

      <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
        🛒 Confirm Order
      </button>
    </div>
  );
}

export default ViewDishesComponent;
