import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5201/api';

const PaymentCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);
    const [errorCart, setErrorCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [localUserId] = useState(localStorage.getItem('userId'));
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (localUserId) {
            fetchCartDetails(localUserId);
        } else {
            console.error('User ID not found in local storage.');
            setErrorCart('User authentication error.');
            setLoadingCart(false);
        }
    }, [localUserId]);

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

    return (
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
    );
};

export default PaymentCart;