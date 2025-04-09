import React, { useState } from 'react';
import "./Login.css"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="container">
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
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="forrem">
                        <div className="forgot">
                            <a href="#">Forgot Password?</a>
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" className="btn" value="Login" />
                    </div>
                </form>
                <div className="signup-line">
                    <p>Don't have an account? <a href="/signup">Signup</a></p>
                </div>
            </div>
        </>
    );
}

export default Login;