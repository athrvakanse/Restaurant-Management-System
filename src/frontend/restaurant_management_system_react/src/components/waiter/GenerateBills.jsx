import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ViewDetails.css'; // The combined CSS file

const GenerateBills = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:5248/api';

    useEffect(() => {
        console.log("useEffect is running. Starting data fetch...");
        const fetchOrders = async () => {
            try {
                // Fetch all data from the API endpoints
                const [ordersRes, usersRes, orderDetailsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/Order`),
                    fetch(`${API_BASE_URL}/User`),
                    fetch(`${API_BASE_URL}/OrderDetail`)
                ]);

                console.log("API responses received.");

                // Check if the responses are successful
                if (!ordersRes.ok || !usersRes.ok || !orderDetailsRes.ok) {
                    throw new Error('Failed to fetch data from one or more endpoints.');
                }

                // Parse the JSON data
                const ordersData = await ordersRes.json();
                const usersData = await usersRes.json();
                const orderDetailsData = await orderDetailsRes.json();
                
                console.log("Raw orders data:", ordersData);
                console.log("Raw users data:", usersData);
                console.log("Raw order details data:", orderDetailsData);

                // Filter users to get customers and kitchen staff
                const customerUsers = usersData.filter(user => user.rId === 2);
                const kitchenStaffUsers = usersData.filter(user => user.rId === 4);
                
                console.log("Filtered customer users:", customerUsers);
                console.log("Filtered kitchen staff users:", kitchenStaffUsers);

                // Filter orders to get only those with a 'Completed' status
                const completedOrders = ordersData.filter(order => order.status && order.status.toLowerCase() === 'complete');
                
                console.log("Filtered completed orders:", completedOrders);

                // Map through the completed orders to enrich them with details
                const ordersWithDetails = completedOrders.map(order => {
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

                console.log("Final orders with details:", ordersWithDetails);
                
                setOrders(ordersWithDetails);
                setLoading(false);
            } catch (err) {
                console.error('Error in fetchOrders:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);
    
    const handlePaymentDone = async (orderId) => {
        console.log(`Attempting to mark order ${orderId} as 'Payment Done'.`);
        const orderToUpdate = orders.find(order => order.oId === orderId);
        
        if (!orderToUpdate) {
            console.error(`Order with ID ${orderId} not found in state.`);
            alert("Order not found.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/Order/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...orderToUpdate,
                    status: 'Payment Done'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status to "Payment Done".');
            }
            
            console.log(`Successfully updated order ${orderId} to 'Payment Done'.`);
            
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.oId === orderId
                        ? { ...order, status: 'Payment Done' }
                        : order
                )
            );
        } catch (err) {
            console.error('Error updating order status:', err);
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
                <h2 className="text-center mb-4">Generate Bills</h2>
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
                                    <p><strong>Amount:</strong> Rs. {order.amount.toFixed(2)}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                </div>
                                <div className="card-footer">
                                    {order.status && order.status.toLowerCase() === 'complete' && (
                                        <button
                                            onClick={() => handlePaymentDone(order.oId)}
                                            className="btn btn-success mt-2 w-100"
                                        >
                                            Payment Done
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-orders-message">
                            No completed orders available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GenerateBills;