// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaList, FaHome, FaSearch } from "react-icons/fa";

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
          <FaHome style={logoIconStyle} size={32} />
          <span>FlexCart</span>
        </Link>
      </div>

      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/orders" style={navLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>
            <FaList style={navIconStyle} size={24} />
            Orders
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/carts" style={navLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>
            <FaShoppingCart style={navIconStyle} size={24} />
            Cart Items
            <span style={cartCountStyle}>
              {/* Replace with your actual cart item count */}
              3
            </span>
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/users" style={navLinkStyle} onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>
            <FaUser style={navIconStyle} size={24} />
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Dashboard;
