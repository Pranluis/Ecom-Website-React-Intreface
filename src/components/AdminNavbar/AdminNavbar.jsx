import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import Logout from '../Logout/Logout';

const AdminNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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
        position: 'sticky', // Make the navbar sticky
        top: 0,
        zIndex: 100, // Ensure it stays above other content
    };

    const logoStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: Dark_blue_gray,
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
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

    const dropdownMenuStyle = {
        display: dropdownOpen ? 'block' : 'none',
        position: 'absolute',
        top: '110%',
        left: 'auto',
        right: '-15%',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'auto', // Enable scrollbar if content overflows
        zIndex: 10,
        minWidth: '150px',
        maxHeight: '300px', // Set a maximum height to contain the dropdown
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
        whiteSpace: 'nowrap', // Prevent text from wrapping
    };

    const dropdownItemHoverStyle = {
        backgroundColor: '#f8f9fa',
        color: orange_red,
    };

    // Close dropdown when clicking outside
    useEffect(() => {
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

    return (
        <nav style={navbarStyle}>
            <div style={logoStyle}>
                <h3>Admin Menu - FlexCart</h3>
            </div>
            <ul style={navListStyle}>
                <li style={navItemStyle} ref={dropdownRef}>
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
                            to="/user-management"
                            style={dropdownItemStyle}
                            onMouseOver={(e) => Object.assign(e.currentTarget.style, dropdownItemHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.currentTarget.style, dropdownItemStyle)}
                        >
                            User Profiles Management
                        </Link>
                        <Link
                            to="/order-management"
                            style={dropdownItemStyle}
                            onMouseOver={(e) => Object.assign(e.currentTarget.style, dropdownItemHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.currentTarget.style, dropdownItemStyle)}
                        >
                            Orders Management
                        </Link>
                        <Link
                            to="/product-management"
                            style={dropdownItemStyle}
                            onMouseOver={(e) => Object.assign(e.currentTarget.style, dropdownItemHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.currentTarget.style, dropdownItemStyle)}
                        >
                            Product Management
                        </Link>
                        <Logout />
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;