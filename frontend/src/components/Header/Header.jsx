import React, { useState, useEffect } from 'react';
import './Header.css'; // Importing the CSS file

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // State to control transition

  // Define slide data with direct CSS gradient values
  const slides = [
    {
      title: "Nexa Store: Discover Premium",
      subtitle:
        "Explore our extensive selection of premium products curated to elevate your shopping experience and satisfy your every need with quality and convenience.",
      // gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Original gradient
      icon: "🛍️",
    },
    {
      title: "Quality Products: Exceptional Service",
      subtitle:
        "From trendy fashion to cutting-edge electronics, we bring you the finest collection with unmatched quality and customer satisfaction guarantee.",
      // gradient: "linear-gradient(135deg, #f093fb 0%, rgb(69, 0, 9) 100%)", // Original gradient
      icon: "⭐",
    },
    {
      title: "Worldwide Shopping: Lightning-Fast Shipping",
      subtitle:
        "Experience lightning-fast delivery to your doorstep with our advanced logistics network spanning across the globe for your convenience.",
      // gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", // Original gradient
      icon: "🚀",
    },
  ];

  // Effect for automatic slide advance
  useEffect(() => {
    // Set a timeout to introduce the first slide animation
    const initialLoadTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, 100); // Small delay to allow initial render before animating

    const interval = setInterval(() => {
      setIsAnimating(false); // Start fade-out
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(true); // Start fade-in for new slide
      }, 500); // Duration of fade-out before changing content
    }, 5000); // Auto-advance every 5 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(initialLoadTimeout);
    };
  }, [slides.length]);

  // Handler for manual slide navigation
  const goToSlide = (index) => {
    if (index === currentSlide) return; // Prevent unnecessary re-animation if clicking current slide
    setIsAnimating(false); // Start fade-out
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(true); // Start fade-in for new slide
    }, 500); // Duration of fade-out before changing content
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="header-container">
      {/* Background Section with Gradient and animations */}
      <div
        className="header-background"
        style={{ backgroundImage: currentSlideData.gradient }}
      >
        {/* Animated background elements */}
        <div className="background-blob blob-1 animate-blob animation-delay-2000"></div>
        <div className="background-blob blob-2 animate-blob animation-delay-4000"></div>
        <div className="background-blob blob-3 animate-blob animation-delay-6000"></div>
        <div className="background-blob blob-4 animate-blob animation-delay-8000"></div>

        {/* Floating Emojis */}
        <div className="floating-emojis-container">
          {["💎", "🎯", "✨", "🌟", "🎈", "🎊"].map((emoji, i) => (
            <div
              key={i}
              className={`floating-emoji animate-float-nexa-${i + 1}`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Header Content */}
      <div className="header-content-wrapper">
        <div className={`slide-content ${isAnimating ? "is-visible" : "is-hidden"}`}>
          <div className="slide-icon">{currentSlideData.icon}</div>
          <h1 className="header-title">
            {currentSlideData.title}
          </h1>
          <p className="header-subtitle">
            {currentSlideData.subtitle}
          </p>

          {/* CTA Section */}
          <div className="cta-section">
            <button className="cta-primary-button">
              Start Shopping <span className="button-icon">🛒</span>
            </button>
            <button className="cta-secondary-button">
              Explore Categories <span className="button-icon">📱</span>
            </button>
          </div>

          {/* Features Preview */}
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
      </div>

      {/* Slide Indicators */}
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

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line animate-scroll-line"></div>
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-arrow animate-bounce">↓</div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number stat-number-teal">10K+</span>
          <span className="stat-label">Happy Customers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number stat-number-amber">500+</span>
          <span className="stat-label">Premium Products</span>
        </div>
        <div className="stat-item">
          <span className="stat-number stat-number-sky">50+</span>
          <span className="stat-label">Countries Served</span>
        </div>
        <div className="stat-item">
          <span className="stat-number stat-number-lime">99%</span>
          <span className="stat-label">Satisfaction Rate</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
