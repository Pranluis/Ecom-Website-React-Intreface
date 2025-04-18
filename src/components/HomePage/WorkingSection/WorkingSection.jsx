import React from 'react'
import './WorkingSection.css'
import ScrollAnimation from '../../ExtraContents/ScrollAnimation';

const WorkingSection = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Products",
      description: "Explore a wide range of categories and find exactly what you need.",
      image: "https://media-hosting.imagekit.io/bb50a96d0717401a/Screenshot%202025-04-18%20142210.png?Expires=1839574360&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=UpQ5ZIt5O6hN5vWuDJMUhiREctEEHI7vyjLY7xoosFG7Bc9C2UTe5aMWlMc794BwbtpgYll59bVnTfK1dxsTZV7WYyHRNxde5KTlLQIzu1Wo-HQfLCalgtT6NQnfyIZA~6mmAvsCHOZ3OGp1TIIjKYYDQOyamALt2k9gO9WWZdo6JhiU4tjik1JoLa2iMRwc6A3IxcDoNLb~8JTWV6KCxRAfMvErthZDpsDNElNzYFMYvw3C9Dy20CiHZnqwnw8XAATym98S3f2ghqD27EAxTxodbfMRHQFFjDvJX9l~CqfrtlM4cUWhtlQ2N9-r6B0SJDpViifj0IRjIUDco~a7sg__",
    },
    {
      id: 2,
      title: "Add to Cart",
      description: "Select your favorite products and add them to your shopping cart with ease.",
      image: "https://media-hosting.imagekit.io/d8be9c87c6a9474d/Screenshot%202025-04-18%20142615.png?Expires=1839574762&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=T11kCKY9THzGs~pdZFMARVSsI9Zr5L5q-SD3QLjDx5-zjxYdh5od-acnqkgHAz~ySBxhgzU1Eak2X~ZkC1IS83cvM82J7x0zlvBrn7jcpDAuCT83mWHG2qI0V0lLoDJWwWnYu~y72BxDZoS0VTJPJ8UZnNE1KefBzAxMlegT0TqecDVw6ieZnm99RuJQwF72dQtvZT0L5nQr4X82lOOCNPwEqKgVN0AbDGRDMBXtRhMUdmOSDIiu543NEeVzcwWNnap~aRGWvuy5eBcbE3a-MOHXZcUUtTTi6id2N5NRbksaaipR7VOp8drh5nBvfdxo~7GZfPMGR3ok5KS-nQMLvg__",
    },
    {
      id: 3,
      title: "Secure Checkout",
      description: "Enter your details and choose a payment method to complete your purchase securely.",
      image: "https://media-hosting.imagekit.io/a440cfe762e24ac7/Screenshot%202025-04-18%20143015.png?Expires=1839574857&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=2z61yOqMd3YUE62kCKWkhGS923FwnuJwPT-BORmLEdE2yOQlUHZgYkpOFkOvgCn-s6z~F78cN0g-9RbSJh~5yEUQ~QCMxT~SVEvi38-Kxw9tlRS2fitz4C27hGmIeAWGOySvDP1cpr4qCwVzUG2MVt5iyARDCdn8mZDK9PnfqitYtLrISKzB2XnHRcoc0tR6jbKsLR5~~4poV~NlNi6PYSM5OZxH2Px9AQlk3RztAQ6zfJNfBOoY3YGowxZ7GG-Qxk3evN-6pyinPodHScmE1bvcoKjdaJ-D8TxrJsRv8AdVP~QgSoAD5pftahFK833qE03A7WdvRlm6dbOamZbi6g__",
    },
    {
      id: 4,
      title: "Track Your Order",
      description: "Get real-time updates and stay informed from dispatch to delivery.",
      image: "https://media-hosting.imagekit.io/8120fe78ccb744db/Screenshot%202025-04-18%20142851.png?Expires=1839574762&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=pnm1ETcAtfY2jAE7W5IcjCxmm~f2cxmia8A1fSfwoicvXM15otbJLmPp2HIjdxE~YM8JJqoxGsESKnq-aQ8jh4vFmy3fbMedNY9DOd~bz7TiTjXGdyT81djtDcT977~nMq2ld8Oe9hTSohaR5SBQ9ci7UX7qeey1~S5jHJ9uVas6ZOe3L2hCJ3-WEqldkNNpvifGniIDLf7fe3-vqElJkUxlCyV4eZ4C~Ot3VLWo~5dwbwBVxpgvfHj3dvlYZjTy9Vzmjc2kI93LR~sjMtNdlvMVP-00NmAUU1lflR6kGmFI8CkYNj8KhA4mMObIlwphY19lcPlRhqcpI2MsPSeVuQ__",
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
