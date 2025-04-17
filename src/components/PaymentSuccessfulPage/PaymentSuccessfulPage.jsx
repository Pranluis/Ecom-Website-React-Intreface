// src/components/PaymentSuccessfulPage/PaymentSuccessfulPage.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccessfulPage.css'; // Optional CSS file

const PaymentSuccessfulPage = () => {
  const location = useLocation();
  const { state } = location;
  const orderId = state?.orderId;
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the dashboard page after 3 seconds (adjust as needed)
    const redirectTimeout = setTimeout(() => {
      navigate('/dashboard'); // Redirect to the dashboard route
    }, 3000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <div className="payment-successful-container">
      <h2>Order Confirmed </h2>
      <p>Thank you for your order.</p>
      
      {[...Array(8)].map((_, i) => <div key={i} className="confetti"></div>)}
    </div>
  );
};

export default PaymentSuccessfulPage;