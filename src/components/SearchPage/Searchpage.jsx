import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../Card/Card'; 

function SearchResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy product data (replace with your actual data or API call)
  const dummyProducts = [
    { id: 1, name: 'Awesome Toy Robot', description: 'A fun robot for kids.', price: 250.99, imageUrl: '/images/toy_robot.jpg' },
    { id: 2, name: 'Stylish Blue Shirt', description: 'A comfortable cotton shirt.', price: 190.50, imageUrl: '/images/blue_shirt.jpg' },
    { id: 3, name: 'Smart Electronics Watch', description: 'A feature-packed smartwatch.', price: 700.99, imageUrl: '/images/smartwatch.jpg' },
    { id: 4, name: 'Wooden Home Decor Shelf', description: 'A rustic shelf for your living room.', price: 350.00, imageUrl: '/images/wooden_shelf.jpg' },
    { id: 5, name: 'Toy Building Blocks', description: 'Classic building blocks for creative play.', price: 150.75, imageUrl: '/images/building_blocks.jpg' },
    { id: 6, name: 'Elegant Black Dress', description: 'A timeless black dress for any occasion.', price: 499.99, imageUrl: '/images/black_dress.jpg' },
  ];

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      // Simulate fetching data based on the query
      setTimeout(() => {
        const results = dummyProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
        setLoading(false);
      }, 500); // Simulate network delay
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return <div>Loading search results...</div>;
  }

  if (error) {
    return <div>Error loading search results: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Results for "{query}"</h2>
      {searchResults.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {searchResults.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found for "{query}".</p>
      )}
    </div>
  );
}

export default SearchResultsPage;