import React from 'react';
import './Dummy.css'


const products = [
  {
    id: 1,
    name: 'Redmi Note 12 5G',
    price: '₹14,999',
    oldPrice: '₹19,999',
    discount: '25% off',
    rating: '4.2',
    reviews: '89,210',
    img: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/t/9/8/-original-imagpgsg2hvvtcef.jpeg?q=70',
  },
  {
    id: 2,
    name: 'Noise Smart Watch',
    price: '₹1,999',
    oldPrice: '₹3,999',
    discount: '50% off',
    rating: '4.0',
    reviews: '56,789',
    img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/n/v/1/-original-imah6s6pq7wxa4u6.jpeg?q=70',
  },
  {
    id: 3,
    name: 'Men’s Casual Sneakers',
    price: '₹1,199',
    oldPrice: '₹2,299',
    discount: '48% off',
    rating: '4.3',
    reviews: '9,876',
    img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/x/9/g/-original-imagx8gu3d9ahfyt.jpeg?q=70',
  },
  {
    id: 4,
    name: 'Stuffed Teddy Bear 3ft',
    price: '₹499',
    oldPrice: '₹999',
    discount: '50% off',
    rating: '4.6',
    reviews: '1,234',
    img: 'https://rukminim2.flixcart.com/image/612/612/k1nw9zk0/stuffed-toy/y/n/t/cozy-cuddles-soft-and-huggable-jumbo-cream-teddy-american-bear-original-imafk7mfcfcpzzht.jpeg?q=70',
  },
  {
    id: 5,
    name: 'Bluetooth Earbuds',
    price: '₹1,499',
    oldPrice: '₹2,999',
    discount: '50% off',
    rating: '4.4',
    reviews: '34,567',
    img: 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/z/v/y/-original-imagmuggusa94g3u.jpeg?q=70',
  },
];

const ProductList = () => {
  return (
    <div className="product-section-new">
      <h2 className="section-heading-new">Products Available on Our Platform</h2>
      <div className="product-list-new">
        {products.map((product) => (
          <div key={product.id} className="product-card-new">
            <img src={product.img} alt={product.name} className="product-image-new" />
            <div className="product-name-new">{product.name}</div>
            <div className="product-rating-new">
              <span className="star-new">{product.rating}★</span>
              <span className="reviews-new">({product.reviews})</span>
            </div>
            <div className="product-price-new">
              <span className="new-price-new">{product.price}</span>
              <span className="old-price-new">{product.oldPrice}</span>
              <span className="discount-new">{product.discount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
