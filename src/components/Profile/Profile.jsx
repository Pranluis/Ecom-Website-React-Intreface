import React, { useEffect, useState } from "react";
import axios from "axios";


const BASE_URL = "https://localhost:7136/api/Users";

const GetUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            if (!userId || !token) {
                alert("User ID or token is missing.");
                return;
            }
            try {
                const response = await axios.get(`${BASE_URL}/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                alert("Failed to fetch user. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            {user ? (
                <div className="user-details">
                    <h3>User Details</h3>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default GetUser;
