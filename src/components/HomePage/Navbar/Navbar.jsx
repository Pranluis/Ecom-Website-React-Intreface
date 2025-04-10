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
              <div className="interaction-list">
                <ul>
                  <li
                    className="interaction-item"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Home <i className="fa-solid fa-caret-down"></i>
                    <div className="hover-box" id="hover-box-1">
                      <p><i className="fa-solid fa-house"></i>Influencer's Home</p>
                    </div>
                  </li>
                  <li
                    className="interaction-item"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Platform <i className="fa-solid fa-caret-down"></i>
                    <div className="hover-box" id="hover-box-2">
                      <div className="content">
                        <div className="part1">
                          <h2>Platform</h2>
                          <p>
                            <span className="icon"><i className="fa-regular fa-address-book"></i></span>
                            <span className="text">About us</span>
                          </p>
                          <p>
                            <span className="icon"><i className="fa-solid fa-gear"></i></span>
                            <span className="text">How it works</span>
                          </p>
                          <p>
                            <span className="icon"><i className="fa-solid fa-phone"></i></span>
                            <span className="text">Contact Us</span>
                          </p>
                          <p>
                            <span className="icon"><i className="fa-solid fa-circle-info"></i></span>
                            <span className="text">FAQ</span>
                          </p>
                        </div>
                        <div className="part2">
                          <h2>Use Cases</h2>
                          <p>
                            <span className="icon"><i className="fa-solid fa-users"></i></span>
                            <span className="text">Social Marketing</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    Pricing
                  </li>
                  <li
                    className="interaction-item"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Resources <i className="fa-solid fa-caret-down"></i>
                    <div className="hover-box" id="hover-box-3">
                      <p>Content for Option 3</p>
                    </div>
                  </li>
                  <li
                    className="interaction-item"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Explore <i className="fa-solid fa-caret-down"></i>
                    <div className="hover-box" id="hover-box-4">
                      <p>Content for Option 4</p>
                    </div>
                  </li>
                </ul>
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
              <button className='get-started-button' onClick={handleRegisterClick}>Get Started</button>
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
