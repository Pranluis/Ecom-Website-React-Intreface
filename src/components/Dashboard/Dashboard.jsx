// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const navbarStyle = {
    backgroundColor: '#f8f9fa',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e0e0e0',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  };

  const logoLinkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
  };

  const logoIconStyle = {
    marginRight: '0.5rem',
    fill: '#007bff',
  };

  const navListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
  };

  const navItemStyle = {
    marginLeft: '1.5rem',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#555',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s ease',
  };

  const navLinkHoverStyle = {
    color: '#007bff',
  };

  const navIconStyle = {
    marginRight: '0.3rem',
    fill: '#777',
  };

  const cartCountStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    borderRadius: '50%',
    padding: '0.2rem 0.5rem',
    fontSize: '0.8rem',
    marginLeft: '0.5rem',
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        <Link to="/" style={logoLinkStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={logoIconStyle}
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>FlexCart</span>
        </Link>
      </div>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/users" style={navLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={navIconStyle}
            >
              <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            Users
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/orders" style={navLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={navIconStyle}
            >
              <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" />
            </svg>
            Orders
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/carts" style={navLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={navIconStyle}
            >
              <path d="M17 18c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2S6.1 22 7 22s2-.9 2-2-.9-2-2-2zM7 11V4h10v7l-5 3-5-3z" />
            </svg>
            Cart Items
            <span style={cartCountStyle}>
              {/* Replace with your actual cart item count */}
              3
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Dashboard;