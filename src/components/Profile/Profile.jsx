import React, { useEffect, useState } from "react";
import axios from "axios";


const BASE_URL = "https://localhost:7136/api/Users";

const  Profile= () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
    });

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
                setFormData({
                    userId: response.data.userId,
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    phoneNumber: response.data.phoneNumber,
                    address: response.data.address
                });
            } catch (error) {
                alert("Failed to fetch user. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`${BASE_URL}/${userId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
            setIsEditing(false);
        } catch (error) {
            if (error.response && error.response.data) {
                alert(`Failed to update user: ${error.response.data.message}`);
            } else {
                alert("Failed to update user. Please try again later.");
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            {user ? (
                <div className="profile">
                    <h3>Profile</h3>
                    {isEditing ? (
                        <form onSubmit={handleSave}>
                            <div className="profile-details">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="save-button">Save</button>
                        </form>
                    ) : (
                        <div className="profile-details">
                            <p><strong>User ID:</strong> {user.userId}</p>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Password:</strong> {user.password}</p>
                            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                            <p><strong>Address:</strong> {user.address}</p>
                            <button className="edit-button" onClick={handleEdit}>Edit</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Profile;
