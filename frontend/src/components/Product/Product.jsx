import React, { useContext } from 'react';
import './Product.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

const Product = ({ id, name, price, description, image }) => {
  const { favItems, addToFav, removeFromFav, url } = useContext(StoreContext);
  const isFavorite = favItems[id];

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromFav(id);
    } else {
      addToFav(id);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-link">
        <div className="product-image-container">
          <img 
            className="product-image" 
            src={image} 
            alt={name}
            loading="lazy"
          />
          <div className="product-overlay">
            <div className="product-actions">
              <button 
                className="action-btn view-btn"
                title="Quick View"
              >
                <Eye size={18} />
              </button>
              <button 
                className="action-btn cart-btn"
                title="Add to Cart"
              >
                <ShoppingBag size={18} />
              </button>
            </div>
          </div>
          <div className="product-badges">
            <span className="badge-new">New</span>
          </div>
        </div>
        
        <div className="product-content">
          <div className="product-header">
            <h3 className="product-name">{name}</h3>
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill="#fbbf24" 
                  color="#fbbf24"
                />
              ))}
            </div>
            <span className="rating-text">(4.8)</span>
          </div>
          
          <p className="product-description">{description}</p>
          
          <div className="product-footer">
            <div className="price-container">
              <span className="current-price">${price}</span>
              <span className="original-price">${(price * 1.2).toFixed(2)}</span>
            </div>
            <div className="discount-badge">20% OFF</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;