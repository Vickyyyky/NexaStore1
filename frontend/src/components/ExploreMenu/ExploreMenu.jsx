import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <div className="explore-menu-header">
        <h1 className='explore-menu-title'>
          Discover Your Perfect
          <span className="highlight-text"> Category</span>
        </h1>
        <p className='explore-menu-description'>
          Embark on a culinary adventure through our carefully curated collection. 
          From comfort classics to exotic delicacies, each category tells a unique story 
          of flavor, tradition, and innovation crafted just for you.
        </p>
      </div>
      
      <div className="explore-menu-container">
        <div className="explore-menu-grid">
          {menu_list.map((item, index) => (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              key={index} 
              className={`menu-category-card ${category === item.menu_name ? 'active' : ''}`}
            >
              <div className="card-image-wrapper">
                <img 
                  src={item.menu_image} 
                  alt={item.menu_name}
                  className="category-image"
                />
                <div className="image-overlay"></div>
                <div className="category-badge">
                  {category === item.menu_name && (
                    <div className="active-indicator">
                      <span>✓</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-content">
                <h3 className="category-name">{item.menu_name}</h3>
                <div className="category-underline"></div>
              </div>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-icon">🍽️</div>
        <div className="divider-line"></div>
      </div>
    </div>
  );
};

export default ExploreMenu;