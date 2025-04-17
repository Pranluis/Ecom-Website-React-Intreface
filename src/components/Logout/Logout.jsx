import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  const hoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <button
      style={buttonStyle}
      onMouseOver={(e) => e.target.style.backgroundColor = hoverStyle.backgroundColor}
      onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
