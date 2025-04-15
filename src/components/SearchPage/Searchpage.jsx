import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card/Card'; 

function SearchResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      // Fetch data based on the query
      axios.get(`http://localhost:5000/api/products/search?query=${query}`)
        .then(response => {
          setSearchResults(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
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
