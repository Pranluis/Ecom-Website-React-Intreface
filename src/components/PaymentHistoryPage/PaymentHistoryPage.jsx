// src/components/PaymentHistoryPage/PaymentHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentHistory.css';

const BASE_URL = 'https://localhost:7136/api/Payment'; // Update with your base URL

const PaymentHistoryPage = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredPaymentHistory, setFilteredPaymentHistory] = useState([]);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            if (!userId || !token) {
                setError('User ID or token not found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/user-payments/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const sortedHistory = response.data.sort((a, b) => new Date(a.paymentDateTime) - new Date(b.paymentDateTime));
                setPaymentHistory(sortedHistory);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch payment history.');
                console.error('Error fetching payment history:', err.response || err.message);
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [userId, token]);

    useEffect(() => {
        const filterPayments = () => {
            if (!startDate && !endDate) {
                setFilteredPaymentHistory(paymentHistory);
                return;
            }

            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            const filtered = paymentHistory.filter(payment => {
                const paymentDate = new Date(payment.paymentDateTime);
                const paymentDateOnly = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), paymentDate.getDate()); // Consider only date

                if (start && end) {
                    return paymentDateOnly >= start && paymentDateOnly <= end;
                } else if (start) {
                    return paymentDateOnly >= start;
                } else if (end) {
                    return paymentDateOnly <= end;
                }
                return true;
            });
            setFilteredPaymentHistory(filtered);
        };

        filterPayments();
    }, [paymentHistory, startDate, endDate]);

    if (loading) {
        return <div className="payment-history-container">Loading payment history...</div>;
    }

    if (error) {
        return <div className="payment-history-container error">Error: {error}</div>;
    }

    return (
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
            </div>
            {filteredPaymentHistory.length > 0 ? (
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
                        {filteredPaymentHistory.map(payment => (
                            <tr key={payment.paymentId}>
                                <td>{payment.paymentId}</td>
                                <td>₹{payment.amount ? payment.amount.toFixed(2) : 'N/A'}</td>
                                <td>{payment.paymentMethod}</td>
                                <td>{payment.paymentDateTime}</td>
                                <td>
                                    {/* Replace with actual status from your data if available */}
                                    Paid {/* Placeholder status */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No payment history found.</p>
            )}
        </div>
    );
};

export default PaymentHistoryPage;