import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ViewDetails.css';

const ViewDetails = () => {
    const [orders, setOrders] = useState([]);
    const [kitchenStaff, setKitchenStaff] = useState([]);
    const [availableDishes, setAvailableDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editedOrder, setEditedOrder] = useState({});
    const [editedCustomerName, setEditedCustomerName] = useState({ fname: '', lname: '' });
    const [newDish, setNewDish] = useState({ dId: '', dName: '', qty: 1 });

    const API_BASE_URL = 'http://localhost:5248/api';

    var orderId;
    var userId;
    var orderDetailsId;
    var dishesId;

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [ordersRes, usersRes, orderDetailsRes, dishesRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/Order`),
                    fetch(`${API_BASE_URL}/User`),
                    fetch(`${API_BASE_URL}/OrderDetail`),
                    fetch(`${API_BASE_URL}/Dish`)
                ]);

                if (!ordersRes.ok || !usersRes.ok || !orderDetailsRes.ok || !dishesRes.ok) {
                    throw new Error('Failed to fetch data from one or more endpoints.');
                }

                const ordersData = await ordersRes.json();
                const usersData = await usersRes.json();
                const orderDetailsData = await orderDetailsRes.json();
                const dishesData = await dishesRes.json();

                // Assign values to the global variables
                orderId = ordersData.length > 0 ? ordersData[0].oId : 'No orders found';
                userId = usersData.length > 0 ? usersData[0].uId : 'No users found';
                orderDetailsId = orderDetailsData.length > 0 ? orderDetailsData[0].odId : 'No order details found';
                dishesId = dishesData.length > 0 ? dishesData[0].dId : 'No dishes found';

                const unassignedOrders = ordersData.filter(order => !order.chef || order.chef === 0);
                const customerUsers = usersData.filter(user => user.rId === 2);
                const kitchenStaffUsers = usersData.filter(user => user.rId === 4);

                const ordersWithDetails = unassignedOrders.map(order => {
                    const customer = customerUsers.find(user => user.uId === order.uId);
                    const customerName = customer ? `${customer.fname} ${customer.lname}` : 'Unknown Customer';
                    const customerDetails = customer ? { fname: customer.fname, lname: customer.lname, uId: customer.uId } : null;

                    const dishesInOrder = orderDetailsData
                        .filter(detail => detail.order.oId === order.oId)
                        .map(detail => ({
                            odId: detail.odId, // Include odId in the state
                            dId: detail.dish.dId,
                            dName: detail.dish.dName,
                            qty: detail.qty
                        }));

                    return {
                        ...order,
                        customerName,
                        customerDetails,
                        dishes: dishesInOrder,
                        assignedChef: order.chef ? String(order.chef) : ''
                    };
                });

                setOrders(ordersWithDetails);
                setKitchenStaff(kitchenStaffUsers);
                setAvailableDishes(dishesData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const handleEditClick = (orderId) => {
        const orderToEdit = orders.find(o => o.oId === orderId);
        setEditingOrderId(orderId);
        setEditedOrder({
            ...orderToEdit,
            assignedChef: orderToEdit.assignedChef,
            dishes: orderToEdit.dishes,
        });
        if (orderToEdit.customerDetails) {
            setEditedCustomerName({
                fname: orderToEdit.customerDetails.fname,
                lname: orderToEdit.customerDetails.lname,
            });
        }
    };
    
    const handleAddDish = () => {
        if (newDish.dId && newDish.qty > 0 && !editedOrder.dishes.some(d => String(d.dId) === String(newDish.dId))) {
            const dish = availableDishes.find(d => String(d.dId) === String(newDish.dId));
            const updatedDishes = [...editedOrder.dishes, { dId: dish.dId, dName: dish.dName, qty: newDish.qty }];
            setEditedOrder(prev => ({ ...prev, dishes: updatedDishes }));
            setNewDish({ dId: '', dName: '', qty: 1 });
        }
    };

    const handleUpdateDishQuantity = (dId, newQty) => {
        setEditedOrder(prev => ({
            ...prev,
            dishes: prev.dishes.map(d =>
                String(d.dId) === String(dId) ? { ...d, qty: Number(newQty) } : d
            )
        }));
    };

    const handleRemoveDish = (dId) => {
        setEditedOrder(prev => ({
            ...prev,
            dishes: prev.dishes.filter(d => String(d.dId) !== String(dId))
        }));
    };

    const handleSaveEdit = async (orderId) => {
        try {
            if (editedOrder.dishes.length === 0) {
                alert("An order must contain at least one dish.");
                return;
            }

            // 1. Update the Order
            const orderResponse = await fetch(`${API_BASE_URL}/Order/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...editedOrder,
                    chef: editedOrder.assignedChef,
                    orderDetails: editedOrder.dishes.map(dish => ({
                        order: { oId: editedOrder.oId },
                        dish: { dId: dish.dId },
                        qty: dish.qty
                    }))
                }),
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to update order details.');
            }

            // 2. Update the Customer
            const customerResponse = await fetch(`${API_BASE_URL}/User/${editedOrder.customerDetails.uId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uId: editedOrder.customerDetails.uId,
                    fname: editedCustomerName.fname,
                    lname: editedCustomerName.lname,
                    rId: editedOrder.customerDetails.rId,
                }),
            });

            if (!customerResponse.ok) {
                throw new Error('Failed to update customer name.');
            }

            // Update the local state
            setOrders(prevOrders => prevOrders.map(o =>
                o.oId === orderId ? {
                    ...o,
                    ...editedOrder,
                    customerName: `${editedCustomerName.fname} ${editedCustomerName.lname}`,
                    customerDetails: { ...o.customerDetails, ...editedCustomerName }
                } : o
            ));

            setEditingOrderId(null);
            setEditedOrder({});
            setEditedCustomerName({ fname: '', lname: '' });
        } catch (err) {
            console.error('Error saving order:', err);
            alert(`Error: ${err.message}`);
        }
    };

    const handleCancelEdit = () => {
        setEditingOrderId(null);
        setEditedOrder({});
        setEditedCustomerName({ fname: '', lname: '' });
    };

    const handleChefSelect = (orderId, staffId) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.oId === orderId ? { ...order, assignedChef: staffId } : order
            )
        );
    };

    const handlePrepareOrder = async (orderId) => {
        const orderToUpdate = orders.find(order => order.oId === orderId);
        if (!orderToUpdate || !orderToUpdate.assignedChef) {
            alert("Please select a chef before preparing the order.");
            return;
        }

        const selectedChef = kitchenStaff.find(staff => String(staff.uId) === String(orderToUpdate.assignedChef));
        const assignedChefName = selectedChef ? `${selectedChef.fname} ${selectedChef.lname}` : 'Unknown Chef';
        
        // Create an array of dish IDs
        const dishesIdArray = orderToUpdate.dishes.map(dish => dish.dId);

        // Create the orderDetails array
        const orderDetailsArray = orderToUpdate.dishes.map(dish => ({
            odId: dish.odId,
            order: { oId: orderId }
        }));

        const orderDataForBackend = {
            orderId: orderToUpdate.oId,
            userId: orderToUpdate.uId,
            orderDetails: orderDetailsArray,
            dishesId: dishesIdArray,
            customerFirstName: orderToUpdate.customerDetails.fname,
            customerLastName: orderToUpdate.customerDetails.lname,
            status: 'Preparing',
            assignedTo: assignedChefName,
            dishes: orderToUpdate.dishes.map(d => `${d.dName} (x${d.qty})`).join(', ')
        };

        console.log('Final object to be sent to backend:', orderDataForBackend);

        try {
            const response = await fetch(`${API_BASE_URL}/Order/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...orderToUpdate,
                    status: 'Preparing',
                    chef: orderToUpdate.assignedChef,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order with assigned chef and status.');
            }

            setOrders(prevOrders => prevOrders.filter(order => order.oId !== orderId));
            
        } catch (err) {
            console.error('Error preparing order:', err);
            alert(`Error: ${err.message}`);
        }
    };

    if (loading) {
        return <div className="loading">Loading orders...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="main-layout-container">
            {/* Sidebar Component */}
            <div className="bg-light border-end p-3" style={{ width: '250px', minHeight: '100vh' }}>
                <h5 className="text-dark fw-bold text-center mb-4">Waiter Panel</h5>
                <div className="mb-2">
                    <Link to="/viewdetails" className="btn btn-outline-dark w-100 text-start">
                        Orders
                    </Link>
                </div>
                <div className="mb-2">
                    <Link to="/trackdetails" className="btn btn-outline-dark w-100 text-start">
                        Track Orders
                    </Link>
                </div>
                <div className="mb-2">
                    <Link to="/generatebills" className="btn btn-outline-dark w-100 text-start">
                        Generate Bills
                    </Link>
                </div>
            </div>
            
            {/* Main Content (Orders Grid) */}
            <div className="main-content">
                <h2 className="text-center mb-4">View Orders</h2>
                <div className="orders-grid">
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.oId} className={`order-card p-2 ${editingOrderId === order.oId ? 'editing' : ''}`}>
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h3>Order ID: {order.oId}</h3>
                                    <button
                                        onClick={() => handleEditClick(order.oId)}
                                        className="btn btn-outline-secondary btn-sm"
                                    >
                                        <i className="bi bi-pencil-fill">Edit</i>
                                    </button>
                                </div>

                                {editingOrderId === order.oId ? (
                                    // Edit Card
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label className="form-label">Customer Name:</label>
                                            <div className="d-flex">
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    placeholder="First Name"
                                                    value={editedCustomerName.fname}
                                                    onChange={(e) => setEditedCustomerName(prev => ({ ...prev, fname: e.target.value }))}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Last Name"
                                                    value={editedCustomerName.lname}
                                                    onChange={(e) => setEditedCustomerName(prev => ({ ...prev, lname: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        <p><strong>Current Status:</strong> {order.status}</p>

                                        <div className="mb-3">
                                            <label className="form-label">Assign to:</label>
                                            <select
                                                name="assignedChef"
                                                className="form-select"
                                                value={editedOrder.assignedChef}
                                                onChange={(e) => setEditedOrder(prev => ({ ...prev, assignedChef: e.target.value }))}
                                            >
                                                <option value="">-- Select Staff --</option>
                                                {kitchenStaff.map(staff => (
                                                    <option key={staff.uId} value={staff.uId}>
                                                        {staff.fname} {staff.lname}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <hr/>
                                        <h5>Dishes</h5>
                                        <ul className="list-group mb-3">
                                            {editedOrder.dishes && editedOrder.dishes.map((dish, index) => (
                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {dish.dName}
                                                    <div className="d-flex align-items-center">
                                                        <input
                                                            type="number"
                                                            className="form-control me-2"
                                                            style={{ width: '60px' }}
                                                            value={dish.qty}
                                                            min="1"
                                                            onChange={(e) => handleUpdateDishQuantity(dish.dId, e.target.value)}
                                                        />
                                                        <button className="btn btn-danger btn-sm" onClick={() => handleRemoveDish(dish.dId)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <div className="d-flex mb-3">
                                            <select
                                                className="form-select me-2"
                                                value={newDish.dId}
                                                onChange={(e) => setNewDish({ ...newDish, dId: e.target.value })}
                                            >
                                                <option value="">-- Add Dish --</option>
                                                {availableDishes.map(dish => (
                                                    <option key={dish.dId} value={dish.dId}>
                                                        {dish.dName}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                className="form-control me-2"
                                                style={{ width: '80px' }}
                                                value={newDish.qty}
                                                min="1"
                                                onChange={(e) => setNewDish({ ...newDish, qty: e.target.value })}
                                            />
                                            <button className="btn btn-secondary" onClick={handleAddDish}>Add</button>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <button onClick={() => handleSaveEdit(order.oId)} className="btn btn-success me-2">Save</button>
                                            <button onClick={handleCancelEdit} className="btn btn-secondary">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    // Normal Card
                                    <>
                                        <div className="card-body">
                                            <p><strong>Customer:</strong> {order.customerName}</p>
                                            <p>
                                                <strong>Dishes:</strong><br />
                                                <span dangerouslySetInnerHTML={{ __html: order.dishes.map(d => `&nbsp;&nbsp;&nbsp;${d.dName} (x${d.qty})`).join('<br />') }} />
                                            </p>
                                            <p><strong>Status:</strong> {order.status}</p>
                                        </div>
                                        <div className="card-footer">
                                            <label htmlFor={`assign-${order.oId}`}>Assign to:</label>
                                            <select
                                                id={`assign-${order.oId}`}
                                                onChange={(e) => handleChefSelect(order.oId, e.target.value)}
                                                className="form-select"
                                                value={order.assignedChef}
                                                disabled={order.status === 'Preparing' || order.status === 'Completed'}
                                            >
                                                <option value="">-- Select Staff --</option>
                                                {kitchenStaff.map(staff => (
                                                    <option key={staff.uId} value={staff.uId}>
                                                        {staff.fname} {staff.lname}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {order.status !== 'Preparing' && (
                                            <button
                                                onClick={() => handlePrepareOrder(order.oId)}
                                                className="btn btn-primary mt-2 w-100"
                                                disabled={!order.assignedChef}
                                            >
                                                Prepare Order
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-orders-message">No new orders available to assign.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;