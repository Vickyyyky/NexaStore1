// Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "Nexa Store :- Discover Premium",
      highlight: "",
      subtitle:
        "Explore our extensive selection of premium products curated to elevate your shopping experience and satisfy your every need with quality and convenience.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "🛍️",
    },
    {
      title: "Quality Products :- Exceptional Service",
      highlight: "",
      subtitle:
        "From trendy fashion to cutting-edge electronics, we bring you the finest collection with unmatched quality and customer satisfaction guarantee.",
      gradient: "linear-gradient(135deg, #f093fb 0%, rgb(69, 0, 9) 100%)",
      icon: "⭐",
    },
    {
      title: "Worldwide Shopping:- Worldwide Shipping", // ✅ FIXED TYPO HERE
      highlight: "",
      subtitle:
        "Experience lightning-ery to your doorstep with our advanced logistics network spanning across the globe for your convenience.",
      gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",

      icon: "🚀",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="header">
      <div className="header-background">
        <div className="animated-bg"></div>
        <div className="floating-elements">
          <div className="float-element element-1">💎</div>
          <div className="float-element element-2">🎯</div>
          <div className="float-element element-3">✨</div>
          <div className="float-element element-4">🌟</div>
          <div className="float-element element-5">🎈</div>
          <div className="float-element element-6">🎊</div>
        </div>
      </div>

      <div className="header-content">
        <div className={`slide-container ${isVisible ? 'visible' : ''}`}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ '--slide-gradient': slide.gradient }}
            >
              <div className="slide-icon">{slide.icon}</div>
              <h1 className="header-title">
                {slide.title}
                <span className="highlight-text"> {slide.highlight}</span>
              </h1>
              <p className="header-subtitle">{slide.subtitle}</p>

              <div className="cta-section">
                <button className="cta-primary">
                  Start Shopping <span className="btn-icon">🛒</span>
                </button>
                <button className="cta-secondary">
                  Explore Categories <span className="btn-icon">📱</span>
                </button>
              </div>

              <div className="features-preview">
                <div className="feature-item">
                  <div className="feature-icon">🚚</div>
                  <span>Free Shipping</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🔒</div>
                  <span>Secure Payment</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">↩️</div>
                  <span>Easy Returns</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📞</div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-number">10K+</span>
          <span className="stat-label">Happy Customers</span>
        </div>
        <div className="stat">
          <span className="stat-number">500+</span>
          <span className="stat-label">Premium Products</span>
        </div>
        <div className="stat">
          <span className="stat-number">50+</span>
          <span className="stat-label">Countries Served</span>
        </div>
        <div className="stat">
          <span className="stat-number">99%</span>
          <span className="stat-label">Satisfaction Rate</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
