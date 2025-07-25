import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaHome, FaSearch } from "react-icons/fa";
import axios from 'axios';
import Logout from '../Logout/Logout';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null); // Ref for the navbar element
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        console.error('User ID or token not found in storage.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5201/api/CartItems/user-cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartCount(response.data.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartCount();

    const handleClickOutside = (event) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    // Get the height of the navbar after it renders
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    // Listen for resize events to update the height if the navbar's height changes responsively
    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const Dark_blue_gray = '#2c3e50';
  const bright_blue = '#3498db';
  const orange_red = '#e67e22';
  const backgroundColor = '#f0f8ff'; // Light blue

  const navbarStyle = {
    backgroundColor: backgroundColor,
    padding: '1.1rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    borderBottom: `2px solid ${bright_blue}`,
    borderRadius: '8px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'fixed', // Make the navbar fixed
    top: 0,             // Stick it to the top
    left: 0,            // Extend to the left edge
    right: 0,           // Extend to the right edge
    zIndex: 100,        // Ensure it's above other content
  };

  const logoStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: Dark_blue_gray,
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
    marginRight: '0.75rem',
    fill: bright_blue,
  };

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    border: `1px solid ${bright_blue}`,
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    width: '40%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    color: Dark_blue_gray,
  };

  const searchIconStyle = {
    marginRight: '0.75rem',
    color: bright_blue,
    cursor: 'pointer',
  };

  const navListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  };

  const navItemStyle = {
    marginLeft: '2rem',
    position: 'relative',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: Dark_blue_gray,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const navLinkHoverStyle = {
    color: orange_red,
    transform: 'scale(1.05)',
  };

  const navIconStyle = {
    marginRight: '0.5rem',
    fill: bright_blue,
  };

  const cartCountStyle = {
    backgroundColor: orange_red,
    color: 'white',
    borderRadius: '50%',
    padding: '0.3rem 0.6rem',
    fontSize: '0.9rem',
    marginLeft: '0.5rem',
  };

  const dropdownMenuStyle = {
    display: dropdownOpen ? 'block' : 'none',
    position: 'absolute',
    top: '110%',
    left: 'auto',
    right: '-15%',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    zIndex: 10,
    minWidth: '150px',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: dropdownOpen ? 1 : 0,
    transform: dropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
  };

  const dropdownItemStyle = {
    padding: '0.75rem 1.25rem',
    textDecoration: 'none',
    color: Dark_blue_gray,
    display: 'block',
    transition: 'background-color 0.2s ease-in-out',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  };

  const dropdownItemHoverStyle = {
    backgroundColor: '#f8f9fa',
    color: orange_red,
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-product?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear the input after submission
    }
  };

  return (
    <div style={{ paddingTop: `${navbarHeight}px` }}> {/* Use the dynamic navbarHeight */}
      <nav style={navbarStyle} ref={navbarRef}> {/* Attach the ref to the navbar */}
        <div style={logoStyle}>
          <Link to="/dashboard" style={logoLinkStyle}>
            <FaHome style={logoIconStyle} size={32} />
            <span>FlexCart</span>
          </Link>
        </div>

        <form style={searchBarStyle} onSubmit={handleSearchSubmit}> {/* Wrap input in form */}
          <input
            type="text"
            placeholder="Search..."
            style={searchInputStyle}
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaSearch style={searchIconStyle} size={20} />
          </button>
        </form>

        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link
              to="/carts"
              style={navLinkStyle}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, navLinkHoverStyle)}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, { ...navLinkStyle, color: Dark_blue_gray })}
            >
              <FaShoppingCart style={navIconStyle} size={24} />
              Cart
              <span style={cartCountStyle}>
                {cartCount}
              </span>
            </Link>
          </li>
          <li style={navItemStyle} ref={dropdownRef}> {/* Add ref to the list item containing the dropdown */}
            <div
              style={navLinkStyle}
              onClick={toggleDropdown}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, navLinkHoverStyle)}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, { ...navLinkStyle, color: Dark_blue_gray })}
            >
              <FaUser style={navIconStyle} size={24} />
              Account
            </div>
            <div style={dropdownMenuStyle}>
              <Link
                to="/profile"
                style={dropdownItemStyle}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, dropdownItemHoverStyle)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, dropdownItemStyle)}
              >
                My Profile
              </Link>
              <Link
                to="/order-details"
                style={dropdownItemStyle}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, dropdownItemHoverStyle)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, dropdownItemStyle)}
              >
                Orders
              </Link>
              <Link
                to="/payment-history"
                style={dropdownItemStyle}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, dropdownItemHoverStyle)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, dropdownItemStyle)}
              >
                Payment History
              </Link>

              <Logout />
            </div>
          </li>
        </ul>
      </nav>
      {/* Your other content will go here */}
    </div>
  );
}

export default Dashboard;