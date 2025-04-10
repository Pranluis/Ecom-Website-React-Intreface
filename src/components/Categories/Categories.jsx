import React from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  const categoriesStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '2rem 1rem',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e0e0e0',
    fontFamily: "'Roboto', sans-serif", // Apply Google Font
  };

  const categoryItemStyle = {
    textDecoration: 'none',
    color: '#555',
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'color 0.3s ease',
  };

  const categoryImageStyle = {
    marginBottom: '0.5rem',
    width: '80px', 
    height: '80px', 
  };

  const categoryLinkHoverStyle = {
    color: '#007bff',
  };

  return (
    <div style={categoriesStyle}>
      <Link to="/category/toys" style={categoryItemStyle} onMouseOver={(e) => Object.assign(e.target.style, categoryLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, categoryItemStyle)}>
        <img src="src/Images/Toys.png" alt="Toys" style={categoryImageStyle} />
        Toys
      </Link>
      <Link to="/category/clothing" style={categoryItemStyle} onMouseOver={(e) => Object.assign(e.target.style, categoryLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, categoryItemStyle)}>
        <img src="src/Images/Fashion.png" alt="Clothing" style={categoryImageStyle} />
        Clothing
      </Link>
      <Link to="/category/electronics" style={categoryItemStyle} onMouseOver={(e) => Object.assign(e.target.style, categoryLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, categoryItemStyle)}>
        <img src="src/Images/electronics.png" alt="Electronics" style={categoryImageStyle} />
        Electronics
      </Link>
      <Link to="/category/mobiles" style={categoryItemStyle} onMouseOver={(e) => Object.assign(e.target.style, categoryLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, categoryItemStyle)}>
        <img src="src/Images/moblies.png" alt="Mobiles" style={categoryImageStyle} />
        Mobiles
      </Link>
      <Link to="/category/home-decor" style={categoryItemStyle} onMouseOver={(e) => Object.assign(e.target.style, categoryLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, categoryItemStyle)}>
        <img src="src/Images/furniture.png" alt="Home Decor and Furniture" style={categoryImageStyle} />
        Home Decor and Furniture
      </Link>
      <Link to="/category/appliances" style={categoryItemStyle} onMouseOver={(e) => Object.assign(e.target.style, categoryLinkHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, categoryItemStyle)}>
        <img src="src/Images/HomeApps.png" alt="Appliances" style={categoryImageStyle} />
        Appliances
      </Link>
    </div>
  );
}

export default Categories;
