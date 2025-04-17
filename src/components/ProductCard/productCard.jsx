
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";

const BASE_URL = 'http://localhost:5201/api/Product';
const CART_API_URL = 'http://localhost:5201/api/CartItems';

const cardStyle = {
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
  backgroundColor: '#fff',
  overflow: 'hidden',
  width: 'calc(25% - 15px)',
  marginBottom: '15px',
  transition: 'transform 0.3s ease-in-out',
};

const cardStyleHover = {
  transform: 'scale(1.02)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
};

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  padding: '20px',
  justifyContent: 'center',
  alignItems: 'center'
};

const imageContainerStyle = {
  width: '100%',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '8px 8px 0 0',
  objectFit: 'contain',
};

const detailsStyle = {
  padding: '15px',
  textAlign: 'left',
};

const titleStyle = {
  fontSize: '1.1em',
  marginBottom: '5px',
  fontWeight: '500',
  color: '#212121',
};

const descriptionStyle = {
  fontSize: '0.9em',
  color: '#757575',
  marginBottom: '10px',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

const priceCategoryStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const priceStyle = {
  fontSize: '1em',
  fontWeight: 'bold',
  color: '#2874f0',
};

const categoryStyle = {
  fontSize: '0.85em',
  color: '#212121',
  backgroundColor: '#f0f0f0',
  padding: '5px 8px',
  borderRadius: '4px',
};

const quantityControlStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const quantityLabelStyle = {
  fontSize: '0.9em',
  marginRight: '8px',
  color: '#424242',
};

const quantityInputStyle = {
  width: '50px',
  padding: '6px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  textAlign: 'center',
  fontSize: '0.9em',
};

const buttonStyle = {
  backgroundColor: '#ff9f00',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 12px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  fontSize: '0.95em',
  transition: 'background-color 0.2s ease-in-out',
  width: '100%',
};

const buttonStyleHover = {
  backgroundColor: '#e08e00',
};

const cartIconStyle = {
  fontSize: '1em',
};

const loadingStyle = {
  textAlign: 'center',
  padding: '20px',
  fontSize: '1.2em',
};

const errorStyle = {
  textAlign: 'center',
  padding: '20px',
  color: 'red',
  fontSize: '1.2em',
};

const responsiveStyles = `@media (max-width: 1200px) {
  .product-card {
    width: calc(33.33% - 15px);
  }
}

@media (max-width: 900px) {
  .product-card {
    width: calc(50% - 15px);
  }
}

@media (max-width: 600px) {
  .product-card {
    width: 100%;
  }
  .product-grid {
    padding: 10px;
  }
  .product-card {
    marginBottom: 10px;
  }
}`;

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        setError('User ID or token not found in storage.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch product details. Please check the API endpoint and network connection.');
        console.error('Error fetching product details:', err.response || err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, []);

  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      setError('User ID or token not found in storage.');
      return;
    }

    try {
      const response = await axios.post(`${CART_API_URL}?productid=${productId}&userid=${userId}&quantity=${quantity}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Item added to cart:', response.data);
      // Optionally provide user feedback here
    } catch (err) {
      setError('Failed to add item to cart. Please check the API endpoint and network connection.');
      console.error('Error adding item to cart:', err.response || err.message);
      // Optionally provide user feedback for the error
    }
  };

  if (loading) {
    return <div style={loadingStyle}>Loading products...</div>;
  }

  if (error) {
    return <div style={errorStyle}>Error: {error}</div>;
  }

  return (
    <>
      <style>{responsiveStyles}</style>
      <div style={gridStyle} className="product-grid">
        {products.map(product => (
          <div key={product.productId} style={cardStyle} className="product-card">
            <div style={imageContainerStyle} className="image-container">
              <img src={product.productImgURL} alt={product.productName} style={imageStyle} className="product-image" />
            </div>
            <div style={detailsStyle} className="product-details">
              <h2 style={titleStyle} className="product-title">{product.productName}</h2>
              <p style={descriptionStyle} className="product-description">{product.productDescription}</p>
              <div style={priceCategoryStyle} className="price-category">
                <p style={priceStyle} className="product-price">₹{product.productPrice}</p>
                <p style={categoryStyle} className="product-category">{product.productCategory}</p>
              </div>
              <div style={quantityControlStyle} className="quantity-control">
                <label htmlFor={`quantity-${product.productId}`} style={quantityLabelStyle} className="quantity-label">Qty:</label>
                <input
                  type="number"
                  id={`quantity-${product.productId}`}
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                  min="1"
                  style={quantityInputStyle}
                  className="quantity-input"
                />
              </div>
              <button
                onClick={() => handleAddToCart(product.productId)}
                style={buttonStyle}
                className="add-to-cart-button"
              >
                <FaShoppingCart style={cartIconStyle} className="cart-icon" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductCard;