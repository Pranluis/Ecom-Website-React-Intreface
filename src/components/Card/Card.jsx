import React from 'react';
import { Link } from 'react-router-dom';

function Card({ product }) {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '10px',
    maxHeight: '200px',
    objectFit: 'contain',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <div style={cardStyle}>
      <Link to={`/product/${product.id}`} style={linkStyle}>
        <img src={product.imageUrl} alt={product.name} style={imageStyle} />
        <h3>{product.name}</h3>
        <p>{product.description.substring(0, 50)}...</p>
        <p>Price: Rs.{product.price.toFixed(2)}</p>
      </Link>
      <button style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Add to Cart
      </button>
    </div>
  );
}

export default Card;