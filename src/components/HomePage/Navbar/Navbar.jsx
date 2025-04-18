import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleDashboardClick = () => {
    navigate('/login');
  };

  const handleMouseEnter = (event) => {
    const hoverBox = event.currentTarget.querySelector(".hover-box");
    if (hoverBox) {
      hoverBox.classList.add("show");
    }
  };

  const handleMouseLeave = (event) => {
    const hoverBox = event.currentTarget.querySelector(".hover-box");
    if (hoverBox) {
      hoverBox.classList.remove("show");
    }
  };

  return (
    <>
      <div className="body">
        <div className="navbar">
          <div className="top-navbar-header">
            <div className="leftpart-logo-list">
              <div className="logo-part">
                <span id='logo-text'>FlexCart</span>
              </div>
            </div>
            <div className="rightpart-signup-out-buttons">
              <button className='creator-button-signup' onClick={handleLoginClick}>Login</button>
              <button className='brand-button-signup' onClick={handleRegisterClick}>Register</button>
              <div className="menu-box">
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
          </div>
          <div className="middle-content">
            <div className="leftcontent">
              <p className='middle-headline'>Connecting Shoppers with the Best Products for Ultimate Satisfaction</p>
              <p className='middle-subheadline'>Our platform simplifies discovering, managing, and purchasing top products to enhance your shopping experience.</p>
              <button className='get-started-button' onClick={handleDashboardClick}>Get Started</button>
            </div>
            <div className="rightcontent-image">
              <img src="https://faimos.modeltheme.com/wp-content/uploads/2023/05/Main-slider_img.png" alt="home-image" loading='lazy'/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
