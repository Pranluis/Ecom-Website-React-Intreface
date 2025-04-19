import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderConfirmationPage.css';
import axios from 'axios';

const BASE_URL_ORDER = 'http://localhost:5201/api/Order';
const BASE_URL_PAYMENT = 'http://localhost:5201/api/Payment';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const shippingAddress = state?.shippingAddress;
  const localUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); 
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [errorPayment, setErrorPayment] = useState(null);

  useEffect(() => {
    const fetchLatestPayment = async () => {
      if (!localUserId || !token) {
        console.error('User ID or token not found.');
        setErrorPayment('Authentication error.');
        return;
      }

      setLoadingPayment(true);
      setErrorPayment(null);

      try {
        const response = await axios.get(`${BASE_URL_PAYMENT}/user-payments/${localUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            sortOrder: 'desc', 
            pageSize: 1,     
            pageNumber: 1,
          },
        });

        if (response.data && response.data.length > 0) {
          setPaymentDetails(response.data[0]);
        } else {
          setPaymentDetails(null); // No payment history found for the user
        }
      } catch (error) {
        console.error('Error fetching latest payment:', error);
        setErrorPayment('Failed to fetch payment details.');
      } finally {
        setLoadingPayment(false);
      }
    };

    fetchLatestPayment();
  }, [localUserId, token]);

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const handlePlaceOrder = async () => {
    if (!localUserId) {
      console.error('User ID not found in local storage.');
      alert('User authentication error.');
      return;
    }

    if (!shippingAddress) {
      alert('Shipping address is not available.');
      return;
    }

    try {
      const orderUrl = `${BASE_URL_ORDER}/?userid=${localUserId}&shippingaddress=${encodeURIComponent(shippingAddress)}`;
      const response = await axios.post(
        orderUrl,
        {}, // Empty body for POST request
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include your authorization token if required
          },
        }
      );

      if (response.status === 201) {
        console.log('Order placed successfully:', response.data);
        navigate('/payment-successful', { state: { orderDetails: response.data } }); // Navigate to payment successful page
      } else {
        console.error('Failed to place order:', response);
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order.');
    }
  };

  return (
    <div className="order-confirmation-container">
      <h2>Confirm Your Order</h2>
      <div className="shipping-info">
        <h3>Shipping Address</h3>
        <p>{shippingAddress || 'No shipping address provided.'}</p>
      </div>

      <div className="payment-overview">
        <h3>Payment Summary</h3>
        {loadingPayment ? (
          <p className="loading-payment">Loading payment information...</p>
        ) : errorPayment ? (
          <p className="error-payment">{errorPayment}</p>
        ) : paymentDetails ? (
          <>
            <p className="payment-method">
              <strong>Method:</strong> {paymentDetails.paymentMethod || 'N/A'}
            </p>
            <p className="payment-amount">
              <strong>Amount:</strong> ₹{paymentDetails.amount ? paymentDetails.amount.toFixed(2) : 'N/A'}
            </p>
            <p className="payment-date">
              <strong>Date:</strong> {formatDate(paymentDetails.paymentDateTime)}
            </p>
          </>
        ) : (
          <p className="no-payment">No recent payment information found.</p>
        )}
      </div>

      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default OrderConfirmationPage;