import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Import the CSS file

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validatePassword = (password) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= 6 && hasLetter && hasSpecialChar && hasNumber;
    };

    const handleForgotPassword = async () => {
        if (!email) {
            toast.error('Please enter your email.');
            return;
        }
        try {
            const response = await axios.post(`http://localhost:5201/api/Users/forgot-password`, null, {
                params: { email }
            });
            if (response.data) {
                setMessage(response.data.message);
                toast.success(`Your OTP is: ${response.data.otp}`, {
                    autoClose: 30000, // 30 seconds
                });
                setStep(2); // Move to the next step
            } else {
                toast.error('Unexpected response format.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
    };

    const handleResetPassword = async () => {
        setPasswordError('');
        setConfirmPasswordError('');

        if (!otp) {
            toast.error('Please enter the OTP.');
            return;
        }

        if (!newPassword) {
            setPasswordError('Please enter a new password.');
            return;
        }

        if (!validatePassword(newPassword)) {
            setPasswordError('Password must be at least 6 characters long and contain at least one letter, one special character, and one number.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5201/api/Users/reset-password', null, {
                params: {
                    otp: parseInt(otp, 10),
                    newPassword: newPassword
                }
            });
            if (response.data) {
                setMessage(response.data.message);
                if (response.data.message === "Password reset successfully.") {
                    toast.success("Password reset successfully. You can now log in with your new password.");
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000); // Navigate to login page after 3 seconds
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error('Unexpected response format.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="forgot-password-container">
            <ToastContainer />
            <h2>Password Management</h2>
            {step === 1 ? (
                <div className="forgot-password-step">
                    <h3>Forgot Password</h3>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="forgot-password-input"
                    />
                    <button onClick={handleForgotPassword} className="forgot-password-button">Submit</button>
                </div>
            ) : (
                <div className="reset-password-step">
                    <h3>Reset Password</h3>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="reset-password-input"
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="reset-password-input"
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="reset-password-input"
                    />
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                    <button onClick={handleResetPassword} className="reset-password-button">Submit</button>
                </div>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ForgotPassword;
