import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ViewDetails.css'; // The combined CSS file

const TrackDetails = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:5248/api';

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const [ordersRes, usersRes, orderDetailsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/Order`),
                    fetch(`${API_BASE_URL}/User`),
                    fetch(`${API_BASE_URL}/OrderDetail`)
                ]);

                if (!ordersRes.ok || !usersRes.ok || !orderDetailsRes.ok) {
                    throw new Error('Failed to fetch data from one or more endpoints.');
                }

                const ordersData = await ordersRes.json();
                const usersData = await usersRes.json();
                const orderDetailsData = await orderDetailsRes.json();

                // Filter for orders that have a chef assigned.
                // This checks if the `chef` property is not null, undefined, or 0.
                const assignedOrders = ordersData.filter(order => order.chef && order.chef !== 0);

                const customerUsers = usersData.filter(user => user.rId === 2);
                const kitchenStaffUsers = usersData.filter(user => user.rId === 4);

                const ordersWithDetails = assignedOrders.map(order => {
                    const customer = customerUsers.find(user => user.uId === order.uId);
                    const chef = kitchenStaffUsers.find(staff => staff.uId === order.chef);

                    const customerName = customer ? `${customer.fname} ${customer.lname}` : 'Unknown Customer';
                    const chefName = chef ? `${chef.fname} ${chef.lname}` : 'Not Assigned';

                    const dishesInOrder = orderDetailsData
                        .filter(detail => detail.order.oId === order.oId)
                        .map(detail => `&nbsp;&nbsp;&nbsp;${detail.dish.dName} (x${detail.qty})`);

                    return {
                        ...order,
                        customerName,
                        chefName,
                        dishes: dishesInOrder.join('<br />'),
                    };
                });

                setOrders(ordersWithDetails);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

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
                <h2 className="text-center mb-4">Track Orders</h2>
                <div className="orders-grid">
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.oId} className="order-card p-2">
                                <div className="card-header">
                                    <h3>Order ID: {order.oId}</h3>
                                </div>
                                <div className="card-body">
                                    <p><strong>Customer:</strong> {order.customerName}</p>
                                    <p>
                                        <strong>Dishes:</strong><br />
                                        <span dangerouslySetInnerHTML={{ __html: order.dishes }} />
                                    </p>
                                    <p><strong>Assigned Chef:</strong> {order.chef  }</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-orders-message">
                            No orders are currently being prepared.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackDetails;