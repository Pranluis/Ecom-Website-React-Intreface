// src/App.jsx
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Login from './components/LoginPage/Login';
import RegisterPage from './components/RegisterPage/RegisterPage';
import CRUD from './components/ProductDash/CRUD';
import Dashboard from './components/Dashboard/Dashboard';
import CartPage from './components/CartPage/CartPage';
import Profile from './components/Profile/Profile';
import Card from './components/Card/Card';
import PaymentHistoryPage from './components/PaymentHistoryPage/PaymentHistoryPage'; // Import the new component
import PaymentPage from './components/PaymentPage/PaymentPage';
import PaymentSuccessfulPage from './components/PaymentSuccessfulPage/PaymentSuccessfulPage';
import OrderConfirmationPage from './components/OrderConfirmationPage/OrderConfirmationPage'; // Import the OrderConfirmationPage

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/product-management" element={<CRUD />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/carts" element={<CartPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/payment-history" element={<PaymentHistoryPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/payment-successful" element={<PaymentSuccessfulPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="/card" element={<Card />} />
                    
                </Routes>
            </Router>
        </div>
    );
}

export default App;