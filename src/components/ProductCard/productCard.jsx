import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const BASE_URL = 'http://localhost:5201/api/Product';
const CART_API_URL = 'http://localhost:5201/api/CartItems';

const ProductCard = () => {
const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        const [productResponse, cartResponse] = await Promise.all([
          axios.get(BASE_URL, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`http://localhost:5201/api/CartItems/user-cart/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const productsWithQuantity = productResponse.data.map(product => ({
          ...product,
          quantity: 1, // Initialize quantity for each product
        }));

        setProducts(productsWithQuantity);
        setCartItems(cartResponse.data);
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

  const handleQuantityChange = (productId, newQuantity) => {
    setProducts(products.map(product =>
      product.productId === productId ? { ...product, quantity: newQuantity } : product
    ));
  };

  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const product = products.find(product => product.productId === productId);

    if (!userId || !token) {
      setError('User ID or token not found in storage.');
      return;
    }

    // Check if the product is already in the cart
    const isProductInCart = cartItems.some(item => item.productId === productId);
    if (isProductInCart) {
      toast.error('This product is already in your cart.');
      return;
    }

    try {
      const response = await axios.post(`${CART_API_URL}?productid=${productId}&userid=${userId}&quantity=${product.quantity}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Item added to cart:', response.data);
      setCartItems([...cartItems, response.data]); // Update cart items
      toast.success('Product added to cart successfully!');
      setTimeout(() => {
        window.location.reload();
     }, 2000); 
      
    } catch (err) {
      setError('Failed to add item to cart. Please check the API endpoint and network connection.');
      console.error('Error adding item to cart:', err.response || err.message);
      toast.error('Failed to add item to cart.');
    }
  };

  if (loading) {
    return <div className="loading-message">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <>
    <ToastContainer />
      <style>{`
        .product-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          padding: 20px;
          justify-content: center;
          align-items: center;
        }

        .product-card {
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          background-color: #fff;
          overflow: hidden;
          width: calc(25% - 15px);
          margin-bottom: 15px;
          transition: transform 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 400px; /* Increased height */
        }

        .product-card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .image-container {
          width: 100%;
          height: 200px; /* Increased height for images */
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
        }

        .product-image {
          max-width: 100%;
          max-height: 100%;
          border-radius: 8px 8px 0 0;
          object-fit: contain;
        }

        .product-details {
          padding: 15px;
          text-align: left;
        }

        .product-title {
          font-size: 1.1em;
          margin-bottom: 5px;
          font-weight: 500;
          color: #212121;
        }

        .product-description {
          font-size: 0.9em;
          color: #757575;
          margin-bottom: 10px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price-category {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .product-price {
          font-size: 1em;
          font-weight: bold;
          color: #2874f0;
        }

        .product-category {
          font-size: 0.85em;
          color: #212121;
          background-color: #f0f0f0;
          padding: 5px 8px;
          border-radius: 4px;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .quantity-label {
          font-size: 0.9em;
          margin-right: 8px;
          color: #424242;
        }

        .quantity-input {
          width: 50px;
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 4px;
          text-align: center;
          font-size: 0.9em;
        }

        .add-to-cart-button {
          background-color: #ff9f00;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 0.95em;
          transition: background-color 0.2s ease-in-out;
          width: 100%;
        }

        .add-to-cart-button:hover {
          background-color: #e08e00;
        }

        .cart-icon {
          font-size: 1em;
        }

        .loading-message {
          text-align: center;
          padding: 20px;
          font-size: 1.2em;
        }

        .error-message {
          text-align: center;
          padding: 20px;
          color: red;
          font-size: 1.2em;
        }

        @media (max-width: 1200px) {
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
            margin-bottom: 10px;
          }
        }
      `}</style>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.productId} className="product-card">
            <div className="image-container">
              <img src={product.productImgURL} alt={product.productName} className="product-image" />
            </div>
            <div className="product-details">
              <h2 className="product-title">{product.productName}</h2>
              <p className="product-description">{product.productDescription}</p>
              <div className="price-category">
                <p className="product-price">₹{product.productPrice}</p>
                <p className="product-category">{product.productCategory}</p>
              </div>
              <div className="quantity-control">
                <label htmlFor={`quantity-${product.productId}`} className="quantity-label">Qty:</label>
                <input
                  type="number"
                  id={`quantity-${product.productId}`}
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.productId, parseInt(e.target.value, 10) || 1)}
                  min="1"
                  className="quantity-input"
                />
              </div>
              <button
                onClick={() => handleAddToCart(product.productId)}
                className="add-to-cart-button"
              >
                <FaShoppingCart className="cart-icon" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductCard;
