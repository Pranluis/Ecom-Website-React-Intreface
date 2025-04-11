import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './RegisterPage.css';

const BASE_URL = "https://localhost:7136/api/Users";

const Registration = () => {
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
      const addUrl = `${BASE_URL}?Name=${formData.name}&Email=${formData.email}&Password=${formData.password}&Phonenumber=${formData.phoneNumber}&Address=${formData.address}`;
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
      <h2>Registration</h2>

      {/* Registration Form */}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}
      >
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
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
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <Link to="/Login" className="btn btn-secondary">
             Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
