import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";

const BASE_URL = 'http://localhost:5201/api/Product';
const CART_API_URL = 'http://localhost:5201/api/CartItems';

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

      setLoading(true); // Set loading true at the start of fetch
      try {
        const response = await axios.get(BASE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch product details. Please check the API endpoint and network connection.');
        console.error('Error fetching product details:', err.response || err.message);
        setProducts([]); // Clear products on error
      } finally {
        setLoading(false); // Ensure loading is set to false
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
    } catch (err) {
      setError('Failed to add item to cart. Please check the API endpoint and network connection.');
      console.error('Error adding item to cart:', err.response || err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {products.map(product => (
        <div key={product.productId} style={cardStyle}>
          <img src={product.productImgURL} alt={product.productName} style={imageStyle} />
          <h2>{product.productName}</h2>
          <p>{product.productDescription}</p>
          <p><strong>Price:</strong> ${product.productPrice}</p>
          <p><strong>Category:</strong> {product.productCategory}</p>
          <div style={quantityStyle}>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              style={quantityInputStyle}
            />
          </div>
          <button onClick={() => handleAddToCart(product.productId)} style={buttonStyle}>
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '1rem',
  width: '300px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  backgroundColor: '#fff',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
};

const buttonStyle = {
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
};

const quantityStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
};

const quantityInputStyle = {
  marginLeft: '0.5rem',
  width: '50px',
  textAlign: 'center',
};

export default ProductCard;
