import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SearchPage.css'; // Import the CSS file
import Dashboard from '../Navbar/Navbar';

const BASE_URL = 'http://localhost:5201/api/Product';
const CART_API_URL = 'http://localhost:5201/api/CartItems';

const SearchProduct = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          axios.get(`${BASE_URL}/search?query=${encodeURIComponent(query)}`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`http://localhost:5201/api/CartItems/user-cart/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const productsWithQuantity = productResponse.data.map(product => ({
          ...product,
          quantity: 1, // Initialize quantity for each product
        }));

        setSearchResults(productsWithQuantity);
        setCartItems(cartResponse.data);
      } catch (err) {
        setError('Failed to fetch product details. Please check the API endpoint and network connection.');
        console.error('Error fetching product details:', err.response || err.message);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [query]);

  const handleQuantityChange = (productId, newQuantity) => {
    setSearchResults(searchResults.map(product =>
      product.productId === productId ? { ...product, quantity: newQuantity } : product
    ));
  };

  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const product = searchResults.find(product => product.productId === productId);

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
    return <div className="loading-message">Loading search results...</div>;
  }

  if (error) {
    return <div className="error-message">Error loading search results: {error}</div>;
  }

  return (
    <>
      <ToastContainer />
      <Dashboard />
      <div className="product-grid">
        {searchResults.length === 0 ? (
          <div className="no-products-message">No products found.</div>
        ) : (
          searchResults.map(product => (
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
          ))
        )}
      </div>
    </>
  );
};

export default SearchProduct;
