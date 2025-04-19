import React from 'react';
import PaymentAddress from './PaymentAddress';
import PaymentCart from './PaymentCart';
import PaymentMethod from './PaymentMethod';
import './PaymentPage.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
    return (
        <div className="payment-page-container">
            <h2>Payment Details</h2>
            <PaymentAddress />
            <PaymentCart />
            <PaymentMethod />
            <ToastContainer />
        </div>
    );
};

export default PaymentPage;