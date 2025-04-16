import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './CartPage.css';
import PaymentPage from '../PaymentPage/PaymentPage';

const initialCartItems = [
  {
    id: 1,
    name: 'R&S Soft Toys Zip Bunny - 30 cm (Pink)',
    price: 219,
    oldPrice: 499,
    discount: '56% off',
    img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/stuffed-toy/k/0/2/strawberry-bunny-plush-toy-adorable-strawberry-rabbit-plushie-35-original-imagusvqsukxfdyf.jpeg?q=70',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Ethnic 4 You Kurti Pant Dupatta Set',
    price: 499,
    oldPrice: 799,
    discount: '44% off',
    img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/z/w/r/s-skd4008-mustrad-j-new-ethnic-4-you-original-imah8ugjny9dhstf.jpeg?q=70',
    quantity: 1,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handlePlaceOrderClick = () => {
    navigate('/payment');
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="cart-items">
          <h2>Shopping Cart</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.img} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <div className="product-price">
                  <span className="new-price">₹{item.price * item.quantity}</span>
                  <span className="old-price">₹{item.oldPrice * item.quantity}</span>
                  <span className="discount">{item.discount}</span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Price Details</h2>
          <p>Price ({cartItems.reduce((total, item) => total + item.quantity, 0)} items): ₹{calculateCartTotal()}</p>
          <p>Platform Fee: ₹0</p>
          <p>Delivery Charges: Free</p>
          <h3>Total Amount: ₹{calculateCartTotal()} </h3>
          <p className="save-text">You will save ₹{initialCartItems.reduce((total, item) => total + (item.oldPrice - item.price) * item.quantity, 0)} on this order.</p>
          <button className="place-order-button" onClick={handlePlaceOrderClick}>PLACE ORDER</button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
