import React from 'react';
import Navbar from '../Navbar/Navbar';
import './CartPage.css';

const CartPage = () => {

  

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="cart-items">
          <h2>Shopping Cart</h2>
          <div className="cart-item">
            <div className="item-details">
              <p>R&S Soft Toys Zip Bunny - 30 cm (Pink)</p>
              <p>Price: ₹219</p>
            </div>
          </div>
          <div className="cart-item">
            <div className="item-details">
              <p>New Ethnic 4 You Women Kurti Pant Dupatta Set</p>
              <p>Price: ₹4,079</p>
            </div>
          </div>
        </div>
        <div className="order-summary">
          <h2>Price Details</h2>
          <p>Price (2 items): ₹4,298</p>
          <p>Platform Fee: ₹0</p>
          <p>Delivery Charges: Free</p>
          <h3>Total Amount: ₹1,048</h3>
          <p>You will save ₹3,250 on this order.</p>
          <button className="place-order-button">PLACE ORDER</button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
