import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentHistory.css';
import Dashboard from '../Navbar/Navbar';
 
const BASE_URL = 'http://localhost:5201/api/Payment';
const PAYMENTS_PER_PAGE = 5; // Number of payments to display per page
 
const PaymentHistoryPage = () => {
    const [allPayments, setAllPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPayments, setCurrentPayments] = useState([]);
 
    useEffect(() => {
        const fetchPaymentHistory = async () => {
            if (!userId || !token) {
                setError('User ID or token not found.');
                setLoading(false);
                return;
            }
 
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/user-payments/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        startDate: startDate || undefined,
                        endDate: endDate || undefined,
                        status: statusFilter === 'All' ? undefined : statusFilter,
                    },
                });
                const sortedHistory = response.data.sort((a, b) => new Date(b.paymentDateTime) - new Date(a.paymentDateTime));
                setAllPayments(sortedHistory);
                setError(null);
            } catch (err) {
                setError('Failed to fetch payment history.');
                console.error('Error fetching payment history:', err.response || err.message);
                setAllPayments([]);
            } finally {
                setLoading(false);
            }
        };
 
        fetchPaymentHistory();
    }, [userId, token, startDate, endDate, statusFilter, paymentMethodFilter]);
 
    useEffect(() => {
        const filteredPayments = allPayments.filter(payment => {
            const paymentDate = new Date(payment.paymentDateTime);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            const statusMatch = statusFilter === 'All' || payment.status === statusFilter;
            const methodMatch = paymentMethodFilter === 'All' || payment.paymentMethod === paymentMethodFilter;
            const dateMatch = (!start || paymentDate >= start) && (!end || paymentDate <= end);
 
            return dateMatch && statusMatch && methodMatch;
        });
 
        const indexOfLastPayment = currentPage * PAYMENTS_PER_PAGE;
        const indexOfFirstPayment = indexOfLastPayment - PAYMENTS_PER_PAGE;
        setCurrentPayments(filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment));
        setTotalPages(Math.ceil(filteredPayments.length / PAYMENTS_PER_PAGE));
    }, [allPayments, startDate, endDate, statusFilter, currentPage]);
 
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
 
    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };
 
    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };
    const handleClearFilters = () => {
        setStartDate('');
        setEndDate('');
        setStatusFilter('All');
        setPaymentMethodFilter('All');
    };
 
    const formatDate = (dateTimeString) => {
        if (!dateTimeString) return 'N/A';
        const date = new Date(dateTimeString);
        const options = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
 
    if (loading) {
        return <div className="payment-history-container">Loading payment history...</div>;
    }
 
    if (error) {
        return <div className="payment-history-container error">Error: {error}</div>;
    }
 
    return (
        <>
        <Dashboard />
        <div className="payment-history-container">
            <h2>Payment History</h2>
            <div className="filter-section">
                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <label htmlFor="statusFilter">Status:</label>
                <select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Payment Completed">Payment Completed</option>
                    <option value="Payment Failed">Payment Failed</option>
                    {/* Add other status options as needed */}
                </select>
                <div>
                    <label htmlFor="paymentMethodFilter">Payment Method:</label>
                    <select id="paymentMethodFilter" value={paymentMethodFilter} onChange={(e) => setPaymentMethodFilter(e.target.value)}>
                        <option value="All">All</option>
                        {[...new Set(allPayments.map(payment => payment.paymentMethod))].sort().map(method => (
                            <option key={method} value={method}>{method}</option>
                        ))}
                        {/* Add other payment method options as needed */}
                    </select>
                </div>
                <button onClick={handleClearFilters} className="clear-filters-button">
                    Clear Filters
                </button>
            </div>
           
            {currentPayments.length > 0 ? (
                <>
                    <table className="payment-history-table">
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Payment Date & Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPayments.map(payment => (
                                <tr key={payment.paymentId}>
                                    <td>{payment.paymentId}</td>
                                    <td>₹{payment.amount ? payment.amount.toFixed(2) : 'N/A'}</td>
                                    <td>{payment.paymentMethod}</td>
                                    <td>{formatDate(payment.paymentDateTime)}</td>
                                    <td>{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-button prev-next">
                                &laquo; Previous
                            </button>
                            {[...Array(totalPages).keys()].map(number => (
                                <button
                                    key={number + 1}
                                    onClick={() => handlePageChange(number + 1)}
                                    className={`pagination-button page-number ${currentPage === number + 1 ? 'active' : ''}`}
                                >
                                    {number + 1}
                                </button>
                            ))}
                            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button prev-next">
                                Next &raquo;
                            </button>
                        </div>
                    )}
                </>
            ) : (
                !loading && <p>No payment history found based on the applied filters.</p>
            )}
        </div>
        </>
    );
};
 
export default PaymentHistoryPage;