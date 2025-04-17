// src/components/OrderConfirmationPage/OrderConfirmationPage.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderConfirmationPage.css'; // Ensure this CSS file exists
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const BASE_URL = 'http://localhost:5201/api'; // Adjust if your API is running elsewhere

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const shippingAddress = state?.shippingAddress;
  const localUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // Assuming you use a token

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
      const orderUrl = `${BASE_URL}/Order?userid=${localUserId}&shippingaddress=${encodeURIComponent(shippingAddress)}`;
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
    <>
    <Navbar />
    <div className="order-confirmation-container">
      <h2>Confirm Your Order</h2>
      <div className="shipping-info">
        <h3>Shipping Address</h3>
        <p>{shippingAddress || 'No shipping address provided.'}</p>
      </div>
      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
</>
  );
};

export default OrderConfirmationPage;