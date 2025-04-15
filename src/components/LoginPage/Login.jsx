import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BASE_URL = "http://localhost:5201/api/Users";
 
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5201/api/Auth/login', formData);
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('email', formData.email);
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                toast.error('Invalid credentials!');
            }
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div className="container">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <h1>Login</h1>
                </div>
                <div className="input-field">
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p>{errors.email[0]}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p>{errors.password[0]}</p>}
                </div>
                <div className="forrem">
                    <div className="forgot">
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
                <div className="button">
                    <input type="submit" className="btn" value={loading ? 'Logging in...' : 'Login'} disabled={loading} />
                </div>
            </form>
            <div className="signup-line">
                <p>Don't have an account? <Link to="/register" className="signup-link">Signup</Link></p>
            </div>
        </div>
    );
};
 
export default Login;
 
 