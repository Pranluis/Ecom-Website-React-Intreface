import React, { useEffect, useRef } from "react";
import "./ScrollAnimation.css";

const ScrollAnimation = ({ children }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Trigger animation when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  return (
    <div ref={elementRef} className="animated-content hidden">
      {children}
    </div>
  );
};

export default ScrollAnimation;
