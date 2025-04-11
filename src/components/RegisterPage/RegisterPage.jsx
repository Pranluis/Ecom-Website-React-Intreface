import React, { useState } from "react";
import axios from "axios";
import './RegisterPage.css';
 
const API_URL = "http://localhost:5201/api/Users";
 
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
 
  });
 
  // Add a new user (POST) using query parameters
  const addUser = async () => {
    try {
      const addUrl = `${API_URL}?Name=${formData.name}&Email=${formData.email}&Password=${formData.password}&Phonenumber=${formData.phoneNumber}&Address=${formData.address}`;
      console.log("Adding user with URL:", addUrl);
 
      await axios.post(addUrl);
      resetForm();
    } catch (error) {
      console.error("Error adding user:", error.response || error.message);
    }
  };
 
  // Reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    });
  };
 
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  return (
    <div className="container">
      <h2>Register</h2>
 
      {/* Add User Form */}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}
      >
        <div className="input-field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button">
          <input type="submit" className="btn" value="Register" />
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default RegisterPage;