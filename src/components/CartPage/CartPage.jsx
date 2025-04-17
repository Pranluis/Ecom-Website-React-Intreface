import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './CartPage.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaTimes } from 'react-icons/fa';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

    if (token && userId) {
      fetch(`http://localhost:5201/api/CartItems/user-cart/${userId}`, {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setCartItems(data);
        })
        .catch(error => console.error('Error fetching cart items:', error))
        .finally(() => setLoading(false));
    } else {
      console.error('Token or user ID not found in local storage');
      setLoading(false);
    }
  }, []);

  const handlePlaceOrderClick = () => {
    navigate('/payment');
  };

  const handleQuantityChange = async (id, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.cartItemId === id ? { ...item, quantity: item.quantity + delta } : item
    );
    setCartItems(updatedItems);

    const updatedItem = updatedItems.find(item => item.cartItemId === id);
    try {
      await axios.put(`http://localhost:5201/api/CartItems/${updatedItem.cartItemId}`, {
        cartItemId: updatedItem.cartItemId,
        productId: updatedItem.productId,
        userId: updatedItem.userId,
        quantity: updatedItem.quantity
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5201/api/CartItems/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCartItems(cartItems.filter(item => item.cartItemId !== id));
      toast.info('Product removed from the cart successfully!');
      

      setTimeout(() => {
          window.location.reload();
       }, 2000); 
        
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
     <ToastContainer />
      <Navbar />
      <div className="main-container">
        <div className="cart-items">
          <h2>Shopping Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.cartItemId} className="cart-card">
                <button onClick={() => handleDeleteItem(item.cartItemId)} className="delete-button">
                  <FaTimes />
                </button>
                <img src={item.productImg} alt={item.productName} />
                <div className="item-details">
                  <h3>{item.productName}</h3>
                  <p>{item.productDes}</p>
                  <div className="product-price">
                    <span className="new-price">₹{item.productPrice * item.quantity}</span>
                    <span className="quantity">Quantity: {item.quantity}</span>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.cartItemId, -1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.cartItemId, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>

        <div className="order-summary">
          <h2>Price Details</h2>
          <p>Price ({cartItems.length} items): ₹{cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0)}</p>
          <p>Platform Fee: ₹0</p>
          <p>Delivery Charges: Free</p>
          <h3>Total Amount: ₹{cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0)}</h3>
          <button className="place-order-button" onClick={handlePlaceOrderClick}>PLACE ORDER</button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
