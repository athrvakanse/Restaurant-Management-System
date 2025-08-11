import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function WaiterOrderDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editingDish, setEditingDish] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = () => {
    axios.get("http://localhost:5248/api/OrderDetail")
      .then((res) => {
        const orderData = res.data.filter((data) => data.odId == id);
        setOrderDetails(orderData);
        console.log(orderData);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };

  // User edit functions
  const handleEditUser = (userData, index) => {
    setEditingUser(index);
    setEditData({
      uId: userData.uId,
      fullName: userData.fullName,
      email: userData.email,
      phoneNo: userData.phoneNo
    });
  };

  const handleSaveUser = (index) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails.forEach((order, i) => {
      if (order.user.uId === editData.uId) {
        updatedOrderDetails[i] = {
          ...order,
          user: {
            ...order.user,
            fullName: editData.fullName,
            email: editData.email,
            phoneNo: editData.phoneNo
          }
        };
      }
    });
    
    setOrderDetails(updatedOrderDetails);
    setEditingUser(null);
    setEditData({});
    alert("User updated successfully!");
  };

  const handleDeleteUser = (userId, rowIndex) => {
    if (window.confirm("Are you sure you want to delete this user entry?")) {
      // Get unique users first
      const uniqueUsers = orderDetails.reduce((acc, current) => {
        const existingUser = acc.find(item => item.user.uId === current.user.uId);
        if (!existingUser) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      // Find the user to delete based on rowIndex
      const userToDelete = uniqueUsers[rowIndex];
      const updatedOrderDetails = orderDetails.filter(order => order.user.uId !== userToDelete.user.uId);
      setOrderDetails(updatedOrderDetails);
      alert("User deleted successfully!");
    }
  };

  // Order edit functions
  const handleEditOrder = (orderData, index) => {
    setEditingOrder(index);
    setEditData({
      oId: orderData.oId,
      amount: orderData.amount,
      payMode: orderData.payMode,
      date: orderData.date.split('T')[0] // Format for date input
    });
  };

  const handleSaveOrder = (index) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails.forEach((order, i) => {
      if (order.order.oId === editData.oId) {
        updatedOrderDetails[i] = {
          ...order,
          order: {
            ...order.order,
            amount: parseFloat(editData.amount),
            payMode: editData.payMode,
            date: editData.date + "T00:00:00" // Add time component back
          }
        };
      }
    });
    
    setOrderDetails(updatedOrderDetails);
    setEditingOrder(null);
    setEditData({});
    alert("Order updated successfully!");
  };

  const handleDeleteOrder = (orderId, rowIndex) => {
    if (window.confirm("Are you sure you want to delete this order entry?")) {
      // Get unique orders first
      const uniqueOrders = orderDetails.reduce((acc, current) => {
        const existingOrder = acc.find(item => item.order.oId === current.order.oId);
        if (!existingOrder) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      // Find the order to delete based on rowIndex
      const orderToDelete = uniqueOrders[rowIndex];
      const updatedOrderDetails = orderDetails.filter(order => order.order.oId !== orderToDelete.order.oId);
      setOrderDetails(updatedOrderDetails);
      alert("Order deleted successfully!");
    }
  };

  // Dish edit functions
  const handleEditDish = (dishData, qty, index) => {
    setEditingDish(index);
    setEditData({
      dId: dishData.dId,
      dName: dishData.dName,
      rate: dishData.rate,
      qty: qty
    });
  };

  const handleSaveDish = (index) => {
    const updatedOrderDetails = [...orderDetails];
    
    // Update the specific order detail item
    updatedOrderDetails[index] = {
      ...updatedOrderDetails[index],
      dish: {
        ...updatedOrderDetails[index].dish,
        dName: editData.dName,
        rate: parseFloat(editData.rate)
      },
      qty: parseInt(editData.qty)
    };
    
    setOrderDetails(updatedOrderDetails);
    setEditingDish(null);
    setEditData({});
    alert("Dish updated successfully!");
  };

  const handleDeleteDish = (dishId, index) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      const updatedOrderDetails = orderDetails.filter((_, i) => i !== index);
      setOrderDetails(updatedOrderDetails);
      alert("Dish deleted successfully!");
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditingOrder(null);
    setEditingDish(null);
    setEditData({});
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Get unique users for the user table
  const uniqueUsers = orderDetails.reduce((acc, current) => {
    const existingUser = acc.find(item => item.user.uId === current.user.uId);
    if (!existingUser) {
      acc.push(current);
    }
    return acc;
  }, []);

  // Get unique orders for the order table
  const uniqueOrders = orderDetails.reduce((acc, current) => {
    const existingOrder = acc.find(item => item.order.oId === current.order.oId);
    if (!existingOrder) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <div>
      <br />
      <br />
      <h3>User</h3>
      <table className="table table-striped table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone No</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {uniqueUsers.map((data, index) => (
            <tr key={`user-${index}`}>
              <td>{data.user.uId}</td>
              <td>
                {editingUser === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                ) : (
                  data.user.fullName
                )}
              </td>
              <td>
                {editingUser === index ? (
                  <input
                    type="email"
                    className="form-control"
                    value={editData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  data.user.email
                )}
              </td>
              <td>
                {editingUser === index ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editData.phoneNo || ''}
                    onChange={(e) => handleInputChange('phoneNo', e.target.value)}
                  />
                ) : (
                  data.user.phoneNo
                )}
              </td>
              <td>
                {editingUser === index ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleSaveUser(index)}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditUser(data.user, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(data.user.uId, index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <br />
        <br />
        <h3>Order</h3>
        <table className="table table-striped table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Payment Mode</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {uniqueOrders.map((data, index) => (
              <tr key={`order-${index}`}>
                <td>{data.order.oId}</td>
                <td>
                  {editingOrder === index ? (
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={editData.amount || ''}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                    />
                  ) : (
                    data.order.amount
                  )}
                </td>
                <td>
                  {editingOrder === index ? (
                    <select
                      className="form-control"
                      value={editData.payMode || ''}
                      onChange={(e) => handleInputChange('payMode', e.target.value)}
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                      <option value="Net Banking">Net Banking</option>
                    </select>
                  ) : (
                    data.order.payMode
                  )}
                </td>
                <td>
                  {editingOrder === index ? (
                    <input
                      type="date"
                      className="form-control"
                      value={editData.date || ''}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  ) : (
                    new Date(data.order.date).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editingOrder === index ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleSaveOrder(index)}
                      >
                        Submit
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEditOrder(data.order, index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteOrder(data.order.oId, index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <br />
        <br />
        <h3>Dish</h3>
        <table className="table table-striped table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th scope="col">Dish ID</th>
              <th scope="col">Dish Name</th>
              <th scope="col">Rate</th>
              <th scope="col">Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((data, index) => (
              <tr key={`dish-${index}`}>
                <td>{data.dish.dId}</td>
                <td>
                  {editingDish === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editData.dName || ''}
                      onChange={(e) => handleInputChange('dName', e.target.value)}
                    />
                  ) : (
                    data.dish.dName
                  )}
                </td>
                <td>
                  {editingDish === index ? (
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={editData.rate || ''}
                      onChange={(e) => handleInputChange('rate', e.target.value)}
                    />
                  ) : (
                    data.dish.rate
                  )}
                </td>
                <td>
                  {editingDish === index ? (
                    <input
                      type="number"
                      className="form-control"
                      value={editData.qty || ''}
                      onChange={(e) => handleInputChange('qty', e.target.value)}
                    />
                  ) : (
                    data.qty
                  )}
                </td>
                <td>
                  {editingDish === index ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleSaveDish(index)}
                      >
                        Submit
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEditDish(data.dish, data.qty, index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteDish(data.dish.dId, index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
