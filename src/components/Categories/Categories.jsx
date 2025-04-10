import React from 'react';
import { Link } from 'react-router-dom';

function Categories() {
  const Dark_blue_gray = '#2c3e50'; 
  const bright_blue = '#3498db'; 
  const orange_red = '#e67e22'; 

  const categoriesStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '2.5rem 2rem',
    backgroundColor: '#f0f8ff',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const categoryItemStyle = {
    textDecoration: 'none',
    color: Dark_blue_gray,
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
  };

  const categoryImageStyle = {
    marginBottom: '1rem',
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    border: `2px solid ${bright_blue}`,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    objectFit: 'cover',
  };

  const categoryLinkHoverStyle = {
    color: orange_red,
    transform: 'scale(1.05)',
  };

  return (
    <div style={categoriesStyle}>
      <Link
        to="/category/toys"
        style={categoryItemStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, categoryLinkHoverStyle)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, { ...categoryItemStyle, color: Dark_blue_gray })}
      >
        <img src="src/Images/Toys.png" alt="Toys" style={categoryImageStyle} />
        Toys
      </Link>
      <Link
        to="/category/clothing"
        style={categoryItemStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, categoryLinkHoverStyle)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, { ...categoryItemStyle, color: Dark_blue_gray })}
      >
        <img src="src/Images/Fashion.png" alt="Clothing" style={categoryImageStyle} />
        Clothing
      </Link>
      <Link
        to="/category/electronics"
        style={categoryItemStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, categoryLinkHoverStyle)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, { ...categoryItemStyle, color: Dark_blue_gray })}
      >
        <img src="src/Images/electronics.png" alt="Electronics" style={categoryImageStyle} />
        Electronics
      </Link>
      <Link
        to="/category/mobiles"
        style={categoryItemStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, categoryLinkHoverStyle)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, { ...categoryItemStyle, color: Dark_blue_gray })}
      >
        <img src="src/Images/moblies.png" alt="Mobiles" style={categoryImageStyle} />
        Mobiles
      </Link>
      <Link
        to="/category/home-decor"
        style={categoryItemStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, categoryLinkHoverStyle)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, { ...categoryItemStyle, color: Dark_blue_gray })}
      >
        <img src="src/Images/furniture.png" alt="Home Decor and Furniture" style={categoryImageStyle} />
        Home Decor
      </Link>
      <Link
        to="/category/appliances"
        style={categoryItemStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, categoryLinkHoverStyle)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, { ...categoryItemStyle, color: Dark_blue_gray })}
      >
        <img src="src/Images/HomeApps.png" alt="Appliances" style={categoryImageStyle} />
        Appliances
      </Link>
    </div>
  );
}

export default Categories;