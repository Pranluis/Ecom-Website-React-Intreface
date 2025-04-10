import React from 'react'
import './FeatureSection.css'
import ScrollAnimation from '../../ExtraContents/ScrollAnimation'

const FeatureSection = () => {
  return (
    <>
        <div className="body3">
            <div className="features">
            <ScrollAnimation>
                <div className="feature-container">
                    <div className="feature-box">
                        <div className="feature-header">
                            <p>Best Feature</p>
                            <h1>Our Latest Features</h1>
                        </div>
                        <ScrollAnimation>
                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i class="fa-solid fa-chart-line" id='fea-icon-1'></i>
                                </div>
                                <div className="feature-text">
                                    <h2>Fast Checkout</h2>
                                    <p>Experience a smooth and speedy checkout process.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i class="fa-regular fa-square-check" id='fea-icon-2'></i>
                                </div>
                                <div className="feature-text">
                                    <h2>Trusted Sellers</h2>
                                    <p>Buy from verified and reliable sellers.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i class="fa-regular fa-comment" id='fea-icon-3'></i>
                                </div>
                                <div className="feature-text">
                                    <h2>24/7 Support</h2>
                                    <p>Get help anytime with our live customer service.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i class="fa-solid fa-rocket" id='fea-icon-4'></i>
                                </div>
                                <div className="feature-text">
                                    <h2>Secure Payments</h2>
                                    <p>All transactions are encrypted and secure.</p>
                                </div>
                            </div>
                        </div>
                        </ScrollAnimation>
                    </div>
                </div>
                </ScrollAnimation>
            </div>
        </div>
    </>
  )
}

export default FeatureSection
