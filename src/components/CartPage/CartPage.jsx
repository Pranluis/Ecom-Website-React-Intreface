import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
const cartItems = [
  {
    id: 1,
    name: 'R&S Soft Toys Zip Bunny - 30 cm (Pink)',
    price: '₹219',
    oldPrice: '₹499',
    discount: '56% off',
    img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/stuffed-toy/k/0/2/strawberry-bunny-plush-toy-adorable-strawberry-rabbit-plushie-35-original-imagusvqsukxfdyf.jpeg?q=70',
  },
  {
    id: 2,
    name: 'Ethnic 4 You Kurti Pant Dupatta Set',
    price: '₹4,079',
    oldPrice: '₹7,299',
    discount: '44% off',
    img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/z/w/r/s-skd4008-mustrad-j-new-ethnic-4-you-original-imah8ugjny9dhstf.jpeg?q=70',
  },
];
 
const CartPage = () => {
  
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
                  <span className="new-price">{item.price}</span>
                  <span className="old-price">{item.oldPrice}</span>
                  <span className="discount">{item.discount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
 
        <div className="order-summary">
          <h2>Price Details</h2>
          <p>Price (2 items): ₹4,298</p>
          <p>Platform Fee: ₹0</p>
          <p>Delivery Charges: Free</p>
          <h3>Total Amount: ₹4,298 </h3>
          <p className="save-text">You will save ₹3,500 on this order.</p>
          <button className="place-order-button" onClick={handlePlaceOrderClick}>PLACE ORDER</button>
        </div>
      </div>
    </>
  );
};
 
export default CartPage;