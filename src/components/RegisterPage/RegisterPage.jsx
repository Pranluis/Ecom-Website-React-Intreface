import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './RegisterPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "http://localhost:5201/api/Users";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) error = "Name is required";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(value))
          error = "Password must be at least 6 characters long and contain at least one letter, one number, and one special character";
        break;
      case "phoneNumber":
        if (!value) error = "Phone number is required";
        else if (!/^\d{10}$/.test(value)) error = "Phone number is invalid";
        break;
      case "address":
        if (!value) error = "Address is required";
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addUser = async () => {
    if (!validateForm()) return;

    try {
      await axios.post(BASE_URL, null, {
        params: {
          Name: formData.name,
          Email: formData.email,
          Password: formData.password,
          Phonenumber: formData.phoneNumber,
          Address: formData.address,
        },
      });
      toast.success("Successfully registered!");
      resetForm();
      // Optionally, redirect the user or show a success message
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrors({ ...errors, email: "Email already exists" });
        toast.error("Email already exists");
      } else {
        console.error("Error adding user:", error.response || error.message);
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  return (
    <div className="container">
      <h2>Registration</h2>

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
          {errors.name && <span className="error">{errors.name}</span>}
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
          {errors.email && <span className="error">{errors.email}</span>}
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
          {errors.password && <span className="error">{errors.password}</span>}
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
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
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
      <ToastContainer />
    </div>
  );
};

export default Registration;
