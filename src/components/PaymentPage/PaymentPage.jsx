// src/components/PaymentPage/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css'; // Ensure this CSS file exists

const BASE_URL = 'https://localhost:7136/api'; // Adjust if your API is running elsewhere

const PaymentPage = () => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);
    const [errorCart, setErrorCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to Cash on Delivery
    const [cardDetailsVisible, setCardDetailsVisible] = useState(false);
    const [upiIdVisible, setUpiIdVisible] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const navigate = useNavigate();

    const [localUserId, setLocalUserId] = useState(null);
    const token = localStorage.getItem('token'); // Assuming you use a token

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setLocalUserId(storedUserId);
            fetchUserDetails(storedUserId);
            fetchCartDetails(storedUserId);
        } else {
            console.error('User ID not found in local storage.');
            setErrorUser('User authentication error.');
            setLoadingUser(false);
            setLoadingCart(false);
        }
    }, []);

    const fetchUserDetails = async (userId) => {
        setLoadingUser(true);
        setErrorUser(null);
        try {
            const response = await axios.get(`${BASE_URL}/Users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
            setNewAddress(response.data?.address || '');
        } catch (error) {
            console.error('Error fetching user details:', error);
            setErrorUser('Failed to load user details.');
        } finally {
            setLoadingUser(false);
        }
    };

    const fetchCartDetails = async (userId) => {
        setLoadingCart(true);
        setErrorCart(null);
        try {
            const response = await axios.get(`${BASE_URL}/CartItems/user-cart/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const cartData = response.data.map(item => ({
                ...item,
                productPrice: Number(item?.productPrice || 0),
                quantity: Number(item?.quantity || 0),
            })).filter(item => !isNaN(item.productPrice) && !isNaN(item.quantity));

            setCartItems(cartData);
            calculateTotalPrice(cartData);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setErrorCart('Failed to load cart items.');
            setTotalPrice(0);
        } finally {
            setLoadingCart(false);
        }
    };

    const calculateTotalPrice = (items) => {
        const total = items.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
        setTotalPrice(total);
    };

    const handleEditAddress = () => {
        setIsEditingAddress(true);
    };

    const handleSaveAddress = async () => {
        if (!localUserId) {
            console.error('User ID not available to update address.');
            alert('User authentication error. Cannot update address.');
            return;
        }
        try {
            const response = await axios.put(
                `${BASE_URL}/Users/${localUserId}?Name=${encodeURIComponent(userName)}&Email=${encodeURIComponent(userEmail)}&Password=${encodeURIComponent(userPassword)}&Phonenumber=${encodeURIComponent(userPhonenumber)}&Address=${encodeURIComponent(newAddress)}`,
                {}, // Send an empty body as address is in the query
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) { // Assuming a successful update returns 200 OK
                // Only update the address in the user state
                setUser(prevUser => ({ ...prevUser, address: newAddress }));
                setIsEditingAddress(false);
                alert('Address updated successfully!');
            } else {
                console.error('Error updating address:', response);
                alert('Failed to update address.');
            }
        } catch (error) {
            console.error('Error updating address:', error);
            alert('Failed to update address.');
        }
    };

    const handleCancelEditAddress = () => {
        setNewAddress(user?.address || '');
        setIsEditingAddress(false);
    };

    const handlePaymentMethodChange = (event) => {
        const method = event.target.value;
        setPaymentMethod(method);
        setCardDetailsVisible(method === 'CARD');
        setUpiIdVisible(method === 'UPI');
    };

    const validateCard = () => {
        if (!/^\d{16}$/.test(cardNumber)) {
            setPaymentError('Invalid card number (must be 16 digits).');
            return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            setPaymentError('Invalid expiry date (MM/YY).');
            return false;
        }
        if (!/^\d{3}$/.test(cvv)) {
            setPaymentError('Invalid CVV (must be 3 digits).');
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
            setPaymentError('Invalid UPI ID format.');
            return false;
        }
        return true;
    };

    const handlePlaceOrder = async () => {
        setPaymentError('');
        setPaymentSuccess(false);

        if (cartItems.length === 0) {
            setPaymentError('Your cart is empty. Please add items to place an order.');
            return;
        }

        if (!localUserId) {
            setPaymentError('User ID not found. Please log in again.');
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/Payment?userid=${localUserId}&paymentmethod=${paymentMethod}`,
                {}, // Sending an empty body as the parameters are in the URL
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include your authorization token if required
                    },
                }
            );

            if (response.status === 201) {
                console.log('Payment initiated/recorded successfully:', response.data);
                setPaymentSuccess(true);
                // Navigate to the payment successful page
                navigate('/order-confirmation', { state: { shippingAddress: user?.address } });
            } else {
                console.error('Payment request failed:', response);
                setPaymentError('Failed to process payment. Please try again.');
            }

        } catch (error) {
            console.error('Error sending payment request:', error);
            setPaymentError('An unexpected error occurred while processing payment.');
        }
    };

    return (
        <div className="payment-page-container">
            <h2>Payment Details</h2>

            {loadingUser ? (
                <p>Loading user address...</p>
            ) : errorUser ? (
                <p style={{ color: 'red' }}>{errorUser}</p>
            ) : (
                <div className="address-section">
                    <h3>Shipping Address</h3>
                    {isEditingAddress ? (
                        <>
                            <textarea
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                placeholder="Enter your shipping address"
                                rows="4"
                                required
                            />
                            <button onClick={handleSaveAddress}>Save Address</button>
                            <button onClick={handleCancelEditAddress}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <p>{user?.address || 'No address available.'}</p>
                            <button onClick={handleEditAddress}>Edit Address</button>
                        </>
                    )}
                </div>
            )}

            <div className="order-summary-section">
                <h3>Order Summary</h3>
                {loadingCart ? (
                    <p>Loading cart details...</p>
                ) : errorCart ? (
                    <p style={{ color: 'red' }}>{errorCart}</p>
                ) : cartItems.length > 0 ? (
                    <>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.cartItemId}>
                                    {item.productName} - ₹{item.productPrice.toFixed(2)} x {item.quantity} = ₹{(item.productPrice * item.quantity).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total Amount: ₹{totalPrice.toFixed(2)}</strong></p>
                    </>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            <div className="payment-method-section">
                <h3>Payment Method</h3>
                <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="COD">Cash on Delivery</option>
                    <option value="CARD">Credit/Debit Card</option>
                    <option value="UPI">UPI</option>
                </select>

                {cardDetailsVisible && (
                    <div className="card-details">
                        <h4>Card Details</h4>
                        <input
                            type="text"
                            placeholder="Card Number (16 digits)"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Expiry Date (MM/YY)"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="CVV (3 digits)"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                        />
                    </div>
                )}

                {upiIdVisible && (
                    <div className="upi-details">
                        <h4>UPI ID</h4>
                        <input
                            type="text"
                            placeholder="Enter UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            required
                        />
                    </div>
                )}

                {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
                {paymentSuccess && <p style={{ color: 'green' }}>Payment successful!</p>}
            </div>

            <button
                className="pay-button"
                onClick={handlePlaceOrder}
                disabled={loadingUser || loadingCart || cartItems.length === 0 || !localUserId}
            >
                Pay Now
            </button>
        </div>
    );
};

export default PaymentPage;