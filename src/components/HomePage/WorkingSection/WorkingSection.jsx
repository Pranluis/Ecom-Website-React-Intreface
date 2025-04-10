import React from 'react'
import './WorkingSection.css'
import ScrollAnimation from '../../ExtraContents/ScrollAnimation';

const WorkingSection = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Products",
      description: "Explore a wide range of categories and find exactly what you need.",
      image: "https://files.readme.io/cb760b2-create-single-message-campaign.png",
    },
    {
      id: 2,
      title: "Add to Cart",
      description: "Select your favorite products and add them to your shopping cart with ease.",
      image: "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/3102884167/original/M7rUtbAW5Gce-LvJRfeMixdaSBjSE0ajjQ.png?1703670907",
    },
    {
      id: 3,
      title: "Secure Checkout",
      description: "Enter your details and choose a payment method to complete your purchase securely.",
      image: "https://developers.is.com/wp-content/uploads/2018/12/create-android1-1.png",
    },
    {
      id: 4,
      title: "Track Your Order",
      description: "Get real-time updates and stay informed from dispatch to delivery.",
      image: "https://learn.classy.org/rs/673-DCU-558/images/Create%20Campaign%20from%20Template.gif",
    },
  ];

  return (
    <>
      <div className="body4">
        <div className="working">
          {/* Starting */}
          <ScrollAnimation>
            <div className="workflow-header">
              <p>Working Process</p>
              <h1>How Dose It Work?</h1>
            </div>
          <div className="workflow-container">
            <div className="workflow-list">
              {steps.map((step) => (
              <ScrollAnimation>
                <div className="workflow-item" key={step.id}>
                  <div className="workflow-image">
                    <img src={step.image} alt={step.title} loading='lazy'/>
                  </div>
                  <div className="workflow-text">
                    <p>Step <span>{step.id}</span></p>
                    <h2>{step.title}</h2>
                    <p>{step.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
              ))}
            </div>
          </div>
          {/* Ending */}
          </ScrollAnimation>
        </div>
      </div>
    </>
  )
}

export default WorkingSection
