// src/components/PaymentSuccessfulPage/PaymentSuccessfulPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccessfulPage.css'; // Optional CSS file
import axios from 'axios';

const BASE_URL_USERS = 'http://localhost:5201/api/Users'; // Adjust if your Users API is different

const PaymentSuccessfulPage = () => {
  const location = useLocation();
  const { state } = location;
  const orderId = state?.orderId;
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
  const token = localStorage.getItem('token'); // Assuming token is used for authentication
  const [userName, setUserName] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      if (!userId || !token) {
        console.error('User ID or token not found.');
        setErrorUser('Authentication error.');
        setLoadingUser(false);
        return;
      }

      setLoadingUser(true);
      setErrorUser(null);

      try {
        const response = await axios.get(`${BASE_URL_USERS}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token if your API requires it
          },
        });

        if (response.data && response.data.name) {
          setUserName(response.data.name);
        } else {
          setErrorUser('Could not retrieve user name.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorUser('Failed to fetch user information.');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserName();
  }, [userId, token]);

  const handleContinueShopping = () => {
    navigate('/dashboard');
  };

  return (
    <div className="payment-successful-container">
      <h2>Order Confirmed</h2>
      {loadingUser ? (
        <p>Loading user information...</p>
      ) : errorUser ? (
        <p className="error">{errorUser}</p>
      ) : (
        <p>
          Thank you for your order, <strong>{userName}</strong>!
        </p>
      )}
      <p>Your items will be on their way soon. In the meantime, why not explore more of our products?</p>
      {orderId && <p className="order-id">Your Order ID: {orderId}</p>}
      <button onClick={handleContinueShopping} className="continue-shopping-button">
        Continue Shopping
      </button>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="confetti"></div>
      ))}
    </div>
  );
};

export default PaymentSuccessfulPage;