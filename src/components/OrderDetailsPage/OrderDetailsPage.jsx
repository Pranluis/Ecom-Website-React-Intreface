import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderDetailsPage.css';
import Dashboard from '../Navbar/Navbar';

const BASE_URL = 'http://localhost:5201/api/Order';
const ORDERS_PER_PAGE = 3; // Number of orders to display per page

const OrderDetailsPage = () => {
    const [allOrders, setAllOrders] = useState([]); // Holds ALL fetched orders
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [orderStatusFilter, setOrderStatusFilter] = useState(''); // Filter by order status
    const [startDateFilter, setStartDateFilter] = useState(''); // Filter by start date
    const [endDateFilter, setEndDateFilter] = useState(''); // Filter by end date
    const [filteredOrders, setFilteredOrders] = useState([]); // Orders after applying filters
    const [totalPages, setTotalPages] = useState(0);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    // Function to fetch order details
    const fetchOrderDetails = async () => {
        if (!userId || !token) {
            setError('User ID or token not found in storage.');
            setLoading(false);
            return;
        }
        setLoading(true); // Set loading true at the start of fetch
        try {
            const response = await axios.get(`${BASE_URL}/user-order/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data && Array.isArray(response.data)) {
                const sortedOrders = response.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
                setAllOrders(sortedOrders);
            } else if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
                setAllOrders([response.data]);
            } else {
                setAllOrders([]);
            }
            setError(null); // Clear previous errors on success
        } catch (err) {
            setError('Failed to fetch order details. Please check the API endpoint and network connection.');
            console.error('Error fetching order details:', err.response || err.message);
            setAllOrders([]); // Clear orders on error
        } finally {
            setLoading(false); // Ensure loading is set to false
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [userId, token]);

    // Function to fetch a single order by ID
    const fetchOrderById = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching order:", error.response?.data || error.message);
            setError("Error fetching order details. Please try again.");
            return null;
        }
    };

    // Function to handle canceling an order with confirmation
    const handleCancelClick = (orderId) => {
        setOrderToCancel(orderId);
        setShowConfirmation(true);
    };

    const confirmCancelOrder = async () => {
        if (!orderToCancel || !token) {
            setError('No order selected for cancellation or token not found.');
            setShowConfirmation(false);
            return;
        }
        try {
            const existingOrder = await fetchOrderById(orderToCancel);
            if (!existingOrder) {
                setError(`Order with ID ${orderToCancel} not found.`);
                setShowConfirmation(false);
                setOrderToCancel(null);
                return;
            }

            const updateUrl = `${BASE_URL}/${orderToCancel}`;
            console.log("Updating order with URL:", updateUrl);

            const payload = {
                ...existingOrder,
                orderStatus: 'Cancelled'
            };

            const response = await axios.put(updateUrl, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status >= 200 && response.status < 300) {
                setError(null); // Clear any previous error
                fetchOrderDetails(); // Refresh the order list
            } else {
                setError(`Failed to cancel order ID ${orderToCancel}. Server responded with status: ${response.status}`);
                console.error(
                    `Error canceling order ID ${orderToCancel}: Server responded with status: ${response.status}`,
                    response.data // Log the response data for more details
                );
            }

        } catch (err) {
            setError(`Failed to cancel order ID ${orderToCancel}. Please try again.`);
            console.error(`Error canceling order ID ${orderToCancel}:`, err.response || err.message);
        } finally {
            setShowConfirmation(false);
            setOrderToCancel(null);
        }
    };

    const cancelConfirmation = () => {
        setShowConfirmation(false);
        setOrderToCancel(null);
    };

    // Page 2: useEffect for Applying Filters
    useEffect(() => {
        // Apply status filter
        const statusFiltered = orderStatusFilter
            ? allOrders.filter(order => order.orderStatus?.toLowerCase() === orderStatusFilter.toLowerCase())
            : allOrders;

        // Apply date range filter
        const dateFiltered = statusFiltered.filter(order => {
            const orderDate = new Date(order.dateTime).getTime();
            const start = startDateFilter ? new Date(startDateFilter).getTime() : null;
            const end = endDateFilter ? new Date(endDateFilter).getTime() : null;

            if (start && end) {
                return orderDate >= start && orderDate <= end;
            } else if (start) {
                return orderDate >= start;
            } else if (end) {
                return orderDate <= end;
            }
            return true;
        });

        setFilteredOrders(dateFiltered);
        setCurrentPage(1); // Reset to the first page after filtering
    }, [allOrders, orderStatusFilter, startDateFilter, endDateFilter]);

    // Page 3: useEffect for Calculating Pagination Data
    useEffect(() => {
        const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
        const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
        setCurrentOrders(filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder));
        setTotalPages(Math.ceil(filteredOrders.length / ORDERS_PER_PAGE));
    }, [filteredOrders, currentPage]);

    // Page 4: Event Handlers for Pagination
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return; // Basic boundary check
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1)); // Go to previous, min page is 1
        window.scrollTo(0, 0);
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages)); // Go to next, max page is totalPages
        window.scrollTo(0, 0);
    };

    // Page 5: Event Handlers for Filters
    const handleOrderStatusChange = (event) => {
        setOrderStatusFilter(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDateFilter(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDateFilter(event.target.value);
    };

    const handleClearFilters = () => {
        setOrderStatusFilter('');
        setStartDateFilter('');
        setEndDateFilter('');
    };

    // Page 6: Helper Functions - formatDate
    const formatDate = (dateTimeString) => {
        if (!dateTimeString) return 'N/A';
        const date = new Date(dateTimeString);
        const options = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    // Page 7: Helper Functions - formatCurrency
    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return 'N/A';
        return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
    };

    // Page 8: Render Logic - Loading and Error States
    if (loading) {
        return <div className="order-details-container">Loading order details...</div>;
    }

    if (error) {
        return <div className="order-details-container error">Error: {error}</div>;
    }

    // Page 9: Render Logic - Display Orders and Pagination
    return (
        <>
            <Dashboard />
            <div className="order-details-container">
                <h2>Your Orders</h2>

                <div className="filters-container">
                    {/* Status Filter */}
                    <div className="filter-item">
                        <label htmlFor="orderStatus">Status:</label>
                        <select
                            id="orderStatus"
                            value={orderStatusFilter}
                            onChange={handleOrderStatusChange}
                        >
                            <option value="">All</option>
                            {/* Dynamically generate options based on available statuses */}
                            {[...new Set(allOrders.map(order => order.orderStatus))].sort().map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date Range Filter */}
                    <div className="filter-item date-filter">
                        <label htmlFor="startDate">Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDateFilter}
                            onChange={handleStartDateChange}
                        />
                        <label htmlFor="endDate" className="date-to-label">to</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDateFilter}
                            onChange={handleEndDateChange}
                        />
                    </div>

                    {/* Clear Filters Button */}
                    <button onClick={handleClearFilters} className="clear-filters-button">
                        Clear Filters
                    </button>
                </div>

                {/* Page 10: Render Logic - Display Current Orders */}
                {currentOrders.length > 0 ? (
                    currentOrders.map((order, index) => (
                        <div key={order.orderId || index} className="order-item-container">
                            <div className="order-header">
                                <h3>Order ID: {order.orderId}</h3>
                                <span>Placed on: {formatDate(order.dateTime)}</span>
                            </div>
                            <div className="order-details-split">
                                {/* Left Side: Order Info */}
                                <div className="order-info-section">
                                    <h4>Order Information</h4>
                                    <div className="detail-item">
                                        <strong>Total Price:</strong> <span>{formatCurrency(order.totalPrice)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Shipping Address:</strong> <span>{order.shippingAddress}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Order Status:</strong> <span className={`status ${order.orderStatus?.toLowerCase().replace(/ /g, '-')}`}>{order.orderStatus}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Payment Status:</strong> <span className={`status ${order.paymentStatus?.toLowerCase().replace(/ /g, '-')}`}>{order.paymentStatus}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>User Name:</strong> <span>{order.userName}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Email:</strong> <span>{order.email}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Phone:</strong> <span>{order.phone}</span>
                                    </div>
                                </div>
                                {/* Right Side: Product Info */}
                                <div className="order-products-section">
                                    <h4>Products in this Order</h4>
                                    {order.products && order.products.length > 0 ? (
                                        <ul className="product-list">
                                            {order.products.map((product, prodIndex) => (
                                                <li key={product.productId + '-' + prodIndex} className="product-item">
                                                    <span className="product-name">{product.productName || 'N/A'}</span>
                                                    <span className="product-quantity">Qty: {product.quantity || 'N/A'}</span>
                                                    <span className="product-price">{formatCurrency(product.productPrice)} each</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No product details available.</p>
                                    )}
                                </div>
                            </div>
                            {/* Add Cancel Button */}
                            {order.orderStatus?.toLowerCase() !== 'cancelled' && order.orderStatus?.toLowerCase() !== 'delivered' && (
                                <div className="order-actions">
                                    <button
                                        onClick={() => handleCancelClick(order.orderId)}
                                        className="cancel-order-button"
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    !loading && <p>No orders found based on the applied filters.</p>
                )}

                {/* Page 11: Render Logic - Pagination Controls */}
                {filteredOrders.length > ORDERS_PER_PAGE && (
                    <div className="pagination-controls">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="pagination-button prev-next"
                        >
                            &laquo; Previous
                        </button>

                        {[...Array(totalPages).keys()].map((num) => (
                            <button
                                key={num + 1}
                                onClick={() => handlePageChange(num + 1)}
                                className={`pagination-button page-number ${currentPage === num + 1 ? 'active' : ''}`}
                            >
                                {num + 1}
                            </button>
                        ))}

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-button prev-next"
                        >
                            Next &raquo;
                        </button>
                    </div>
                )}

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="confirmation-modal">
                        <div className="confirmation-content">
                            <p>Are you sure you want to cancel order ID {orderToCancel}?</p>
                            <div className="confirmation-buttons">
                                <button onClick={confirmCancelOrder} className="confirm-button">Yes, Cancel</button>
                                <button onClick={cancelConfirmation} className="cancel-button">No, Keep Order</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

// Page 12: Export Component
export default OrderDetailsPage;