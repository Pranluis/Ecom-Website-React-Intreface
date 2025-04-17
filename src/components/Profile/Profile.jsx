import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Profile.css';
import Navbar from '../Navbar/Navbar';
 
const BASE_URL = "http://localhost:5201/api/Users";
 
const Profile = () => {
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
 
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        navigate('/login');
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
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          alert("Failed to fetch user. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);
 
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
      const updateUrl = `${BASE_URL}/${userId}?Name=${formData.name}&Email=${formData.email}&Password=${formData.password}&Phonenumber=${formData.phoneNumber}&Address=${formData.address}`;
      console.log("Updating user with URL:", updateUrl);
      await axios.put(updateUrl, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refetch the user data after update
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
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error.response || error.message);
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
    <>
      <Navbar />
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
    </>
  );
};
 
export default Profile;