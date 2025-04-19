import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:5201/api';

const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [netBankingBank, setNetBankingBank] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [localUserId, setLocalUserId] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setLocalUserId(userId);
    }, []);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        setPaymentError('');
    };

    const validateCard = () => {
        if (!/^\d{16}$/.test(cardNumber)) {
            setPaymentError('Card number must contain exactly 16 digits.');
            return false;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            setPaymentError('Invalid expiry date format (MM/YY).');
            return false;
        }
        if (!/^\d{3}$/.test(cvv)) {
            setPaymentError('CVV must contain exactly 3 digits.');
            return false;
        }
        return true;
    };

    const validateUPI = () => {
        if (!upiId) {
            setPaymentError('UPI ID is required.');
            return false;
        }
        if (!/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(upiId)) {
            setPaymentError('Invalid UPI ID format (e.g., user@upi).');
            return false;
        }
        return true;
    };

    const validateNetBanking = () => {
        if (!netBankingBank) {
            setPaymentError('Please select a bank for Net Banking.');
            return false;
        }
        return true;
    };

    const handlePayNow = async () => {
        setPaymentError('');
        setPaymentSuccess(false);

        if (!localUserId) {
            setPaymentError('User authentication error. Please log in again.');
            return;
        }

        // Fetch latest user address
        let userAddress = '';
        try {
            const userResponse = await axios.get(`${BASE_URL}/Users/${localUserId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            userAddress = userResponse.data.address;
        } catch (error) {
            setPaymentError('Failed to fetch shipping address.');
            return;
        }

        // Fetch current cart items
        let cartItems = [];
        try {
            const cartResponse = await axios.get(
                `${BASE_URL}/CartItems/user-cart/${localUserId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            cartItems = cartResponse.data.map(item => ({
                ...item,
                productPrice: Number(item.productPrice || 0),
                quantity: Number(item.quantity || 0)
            })).filter(item => !isNaN(item.productPrice) && !isNaN(item.quantity));
        } catch (error) {
            setPaymentError('Failed to load cart items.');
            return;
        }

        if (cartItems.length === 0) {
            setPaymentError('Your cart is empty. Cannot place order.');
            return;
        }

        // Validate payment details
        let isValid = true;
        switch (paymentMethod) {
            case 'CARD':
                isValid = validateCard();
                break;
            case 'UPI':
                isValid = validateUPI();
                break;
            case 'NETBANKING':
                isValid = validateNetBanking();
                break;
            default:
                break;
        }

        if (!isValid) return;

        // Calculate total price
        const totalPrice = cartItems.reduce(
            (sum, item) => sum + (item.productPrice * item.quantity),
            0
        );

        try {
            const orderData = {
                userId: localUserId,
                products: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    productPrice: item.productPrice,
                    productName: item.productName
                })),
                totalPrice,
                shippingAddress: userAddress,
                paymentMethod,
                paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Processing',
                orderStatus: 'Pending',
                dateTime: new Date().toISOString(),
                ...(paymentMethod === 'CARD' && { cardNumber, expiryDate, cvv }),
                ...(paymentMethod === 'UPI' && { upiId }),
                ...(paymentMethod === 'NETBANKING' && { bankName: netBankingBank })
            };

            const response = await axios.post(
                `${BASE_URL}/Payment?userid=${localUserId}&paymentmethod=${paymentMethod}`,
                {},
                { headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 

                } 
            }
            );

            if (response.status === 201) {
                toast.success('Order placed successfully!');
                navigate('/order-confirmation', {
                    state: { 
                        shippingAddress: userAddress,
                        totalAmount: totalPrice,
                        paymentMethod
                    }
                });
            }
        } catch (error) {
            console.error('Payment error:', error);
            setPaymentError('Payment processing failed. Please try again.');
        }
    };

    return (
        <div className="payment-method-section">
            <h3>Payment Method</h3>
            <select 
                value={paymentMethod} 
                onChange={handlePaymentMethodChange}
                className="payment-method-select"
            >
                <option value="COD">Cash on Delivery</option>
                <option value="CARD">Credit/Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="NETBANKING">Net Banking</option>
            </select>

            {paymentMethod === 'CARD' && (
                <div className="card-details">
                    <h4>Card Details</h4>
                    <input
                        type="text"
                        placeholder="Card Number (16 digits)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength="16"
                    />
                    <input
                        type="text"
                        placeholder="Expiry Date (MM/YY)"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength="5"
                    />
                    <input
                        type="text"
                        placeholder="CVV (3 digits)"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength="3"
                    />
                </div>
            )}

            {paymentMethod === 'UPI' && (
                <div className="upi-details">
                    <h4>UPI ID</h4>
                    <input
                        type="text"
                        placeholder="Enter UPI ID (e.g., user@upi)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                    />
                </div>
            )}

            {paymentMethod === 'NETBANKING' && (
                <div className="netbanking-details">
                    <h4>Select Bank</h4>
                    <select
                        value={netBankingBank}
                        onChange={(e) => setNetBankingBank(e.target.value)}
                    >
                        <option value="">Select Bank</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="AXIS">Axis Bank</option>
                        <option value="PNB">Punjab National Bank</option>
                        <option value="BOB">Bank of Baroda</option>
                    </select>
                </div>
            )}
            {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
            {paymentSuccess && <p style={{ color: 'green' }}>Payment successful!</p>}
            <button 
                className="pay-button"
                onClick={handlePayNow}
                disabled={!localUserId}
            >
                Pay Now
            </button>
        </div>
    );
};

export default PaymentMethod;