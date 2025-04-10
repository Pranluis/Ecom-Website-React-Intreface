// Dashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaList, FaHome, FaSearch } from "react-icons/fa";
import Categories from '../Categories/Categories';

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0.5rem',
    width: '40%',
  };

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',
    padding: '0.5rem',
  };

  const searchIconStyle = {
    marginRight: '0.5rem',
    color: '#777',
  };

  const navListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
  };

  const navItemStyle = {
    marginLeft: '1.5rem',
    position: 'relative',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#555',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
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

  const dropdownMenuStyle = {
    display: dropdownOpen ? 'block' : 'none',
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    zIndex: 1,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: dropdownOpen ? 1 : 0,
    transform: dropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
  };

  const dropdownItemStyle = {
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    color: '#555',
    display: 'block',
    transition: 'background-color 0.3s ease',
  };

  const dropdownItemHoverStyle = {
    backgroundColor: '#f8f9fa',
  };

  return (
    <div>
      <nav style={navbarStyle}>
        <div style={logoStyle}>
          <Link to="/" style={logoLinkStyle}>
            <FaHome style={logoIconStyle} size={32} />
            <span>FlexCart</span>
          </Link>
        </div>

        <div style={searchBarStyle}>
          <FaSearch style={searchIconStyle} size={20} />
          <input type="text" placeholder="Search..." style={searchInputStyle} />
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
            <div style={navLinkStyle} onClick={toggleDropdown}>
              <FaUser style={navIconStyle} size={24} />
              Users
            </div>
            <div style={dropdownMenuStyle}>
              <Link to="/profile" style={dropdownItemStyle} onMouseOver={(e) => Object.assign(e.target.style, dropdownItemHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, dropdownItemStyle)}>
                My Profile
              </Link>
              <Link to="/orders" style={dropdownItemStyle} onMouseOver={(e) => Object.assign(e.target.style, dropdownItemHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, dropdownItemStyle)}>
                Orders
              </Link>
              <Link to="/payment-history" style={dropdownItemStyle} onMouseOver={(e) => Object.assign(e.target.style, dropdownItemHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, dropdownItemStyle)}>
                Payment History
              </Link>
              <Link to="/logout" style={dropdownItemStyle} onMouseOver={(e) => Object.assign(e.target.style, dropdownItemHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, dropdownItemStyle)}>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <Categories />
    </div>
  );
}

export default Dashboard;
