import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // Add smooth scroll to items section when category changes
    const itemsSection = document.getElementById('items-section');
    if (itemsSection) {
      itemsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCategory("All"); // Reset category when searching
  };

  if (isLoading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading delicious content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section with Header */}
      <section className="hero-section">
        <Header onSearch={handleSearch} />
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover Amazing <span className="highlight">Flavors</span>
            </h1>
            <p className="hero-subtitle">
              From local favorites to international cuisine, find your next meal adventure
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Restaurants</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">30min</span>
                <span className="stat-label">Avg Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Exploration Section */}
      <section className="menu-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore Our Menu</h2>
            <p className="section-subtitle">Choose from a diverse menu featuring delicious dishes</p>
          </div>
          <ExploreMenu 
            category={category} 
            setCategory={handleCategoryChange}
          />
        </div>
      </section>

      {/* Items Display Section */}
      <section id="items-section" className="items-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {searchQuery ? `Search Results for "${searchQuery}"` : 
               category === "All" ? "All Items" : `${category} Items`}
            </h2>
            {!searchQuery && (
              <div className="filter-info">
                <span className="active-filter">
                  Showing: <strong>{category}</strong>
                </span>
              </div>
            )}
          </div>
          <ItemDisplay 
            category={category} 
            searchQuery={searchQuery}
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Order?</h2>
            <p className="cta-subtitle">Get our app for the fastest ordering experience</p>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="download-section">
        <div className="container">
          <AppDownload />
        </div>
      </section>

      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
};

export default Home;