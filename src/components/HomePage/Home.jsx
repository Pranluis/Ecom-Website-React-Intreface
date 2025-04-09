import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Our E-Commerce Website</h1>
                <p>Your one-stop shop for all your needs!</p>
            </header>
            <nav className="home-nav">
                <Link to="/login" className="home-link">Login</Link>
                <Link to="/register" className="home-link">Register</Link>
                <Link to="/product-management" className="home-link">Product Management</Link>
            </nav>
            <section className="home-info">
                <h2>About Us</h2>
                <p>We offer a wide range of products from electronics to fashion. Our mission is to provide the best online shopping experience for our customers.</p>
                <h2>Why Shop With Us?</h2>
                <ul>
                    <li>Wide variety of products</li>
                    <li>Competitive prices</li>
                    <li>Fast and reliable shipping</li>
                    <li>Excellent customer service</li>
                </ul>
            </section>
        </div>
    );
}

export default Home;