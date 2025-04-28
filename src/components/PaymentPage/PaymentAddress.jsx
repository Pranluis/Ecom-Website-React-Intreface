import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:5201/api';

const PaymentAddress = () => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [localUserId, setLocalUserId] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setLocalUserId(storedUserId);
            fetchUserDetails(storedUserId);
        } else {
            console.error('User ID not found in local storage.');
            setErrorUser('User authentication error.');
            setLoadingUser(false);
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

    const handleEditAddress = () => {
        setIsEditingAddress(true);
    };

    const handleSaveAddress = async () => {
        if (!localUserId) {
            console.error('User ID not available to update address.');
            toast.error('User authentication error. Cannot update address.');
            return;
        }
        try {
            if (!user) {
                console.error('User data not fetched before updating address.');
                toast.error('Failed to update address. User data not available.');
                return;
            }

            const response = await axios.put(
                `${BASE_URL}/Users/${localUserId}`,
                null,
                {
                    params: {
                        Name: user.name,
                        Email: user.email,
                        Password: user.password,
                        Phonenumber: user.phoneNumber,
                        Address: newAddress,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setUser(prevUser => ({ ...prevUser, address: newAddress }));
                setIsEditingAddress(false);
                toast.success('Address updated successfully!');
            } else {
                console.error('Error updating address:', response);
                toast.error('Failed to update address.');
            }
        } catch (error) {
            console.error('Error updating address:', error);
            toast.error('Failed to update address.');
        }
    };

    const handleCancelEditAddress = () => {
        setNewAddress(user?.address || '');
        setIsEditingAddress(false);
    };

    return (
        <div className="address-section">
            <h3>Shipping Address</h3>
            {loadingUser ? (
                <p>Loading user address...</p>
            ) : errorUser ? (
                <p style={{ color: 'red' }}>{errorUser}</p>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

export default PaymentAddress;
