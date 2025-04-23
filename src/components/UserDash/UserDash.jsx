import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDash.css"; // Updated CSS file
import AdminNavbar from "../AdminNavbar/AdminNavbar";

const API_URL = "http://localhost:5201/api/Users";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "",
    password: "" // Include password in formData but don't show it in the form
  });
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      alert("Error fetching users: " + (error.response?.data?.message || error.message));
    }
  };

  // Update an existing user (PUT) using query parameters
  const handleSave = async (e) => {
    e.preventDefault();
    const userId = formData.userId;
    try {
      await axios.put(`${API_URL}/${userId}`, null, {
        params: {
          Name: formData.name,
          Email: formData.email,
          Password: formData.password, // Include password in the request
          PhoneNumber: formData.phoneNumber,
          Address: formData.address,
          Role: formData.role
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refetch the user data after update
      const response = await axios.get(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        userId: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
        address: response.data.address,
        role: response.data.role,
        password: response.data.password // Keep the password in formData
      });
      setIsEditing(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error.response || error.message);
      if (error.response && error.response.data) {
        alert(`Failed to update user: ${error.response.data.message}`);
      } else {
        alert("Failed to update user. Please try again later.");
      }
    }
  };

  // Delete a user (DELETE)
  const deleteUser = async (id) => {
    try {
      const deleteUrl = `${API_URL}/${id}`;
      console.log("Deleting user with URL:", deleteUrl);

      await axios.delete(deleteUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      alert("Error deleting user: " + (error.response?.data?.message || error.message));
    }
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      userId: "",
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      role: "",
      password: "" // Reset password as well
    });
    setIsEditing(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <AdminNavbar />
      <div className="user-management-container">
        <h2>User Management</h2>

        {/* Update User Form */}
        <form
          className="user-management-form"
          onSubmit={handleSave}
        >
          <h3>Update User</h3>
          <div className="user-management-form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-management-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-management-form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-management-form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-management-form-group">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="user-management-role-dropdown"
            >
              <option value="" disabled>Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="user-management-btn user-management-btn-primary">
            Update User
          </button>
          <button type="button" className="user-management-btn user-management-btn-secondary" onClick={resetForm}>
            Reset
          </button>
        </form>

        <table className="user-management-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <button className="user-management-btn user-management-btn-edit" onClick={() => {
                    setFormData({
                      userId: user.userId,
                      name: user.name,
                      email: user.email,
                      phoneNumber: user.phoneNumber,
                      address: user.address,
                      role: user.role,
                      password: user.password // Include password in formData but don't show it in the form
                    });
                    setIsEditing(true);
                  }}>Edit</button>
                  <button className="user-management-btn user-management-btn-delete" onClick={() => deleteUser(user.userId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserManagement;
