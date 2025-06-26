import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import LoginPopup from '../LoginPopup/LoginPopup';
import './ProductDetails.css';

const ProductDetails = () => {
    const { item_list, addToCart, favItems, addToFav, removeFromFav, url, token } = useContext(StoreContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        // Find the product with the matching id
        const foundProduct = item_list.find(item => item._id === id);

        if (foundProduct) {
            setProduct(foundProduct);
        } 
    }, [id, item_list, navigate]);

    const checkUserLoggedIn = (action) => {
        if (!token) {
            // User is not logged in, show login popup
            setShowLogin(true);
            return false;
        }
        return true;
    };

    const handleAddToCart = () => {
        if (checkUserLoggedIn()) {
            addToFav(id);
        }
    };

    const handleBuyNow = () => {
        if (checkUserLoggedIn()) {
            addToFav(id);
            navigate('/fav');
        }
    };

    if (!product) {
        return <div className="loading">Loading product details...</div>;
    }

    return (
        <div className="">
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
            <div className="product-details-container">
            <div className="product-details">
                <div className="product-image">
                    <img src={url + "/images/" + product.image} alt={product.name} />
                </div>

                <div className="product-info">
                    <div className="product-title-rating">
                        <h1 className="product-title">{product.name}</h1>
                        <img src={assets.rating_starts} alt="Rating" />
                    </div>

                    <p className="product-category">Category: {product.category}</p>
                    <div className="product-price">${parseFloat(product.price).toFixed(2)}</div>

                    <div className="product-description">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="product-actions">
                        <div className="quantity-selector">
                            <label htmlFor="quantity">Quantity:</label>
                            <div className="product-fav-controls">
                                {!favItems[id] ? (
                                   0
                                ) : (
                                    <div className="productDetails-counter">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (checkUserLoggedIn()) {
                                                    removeFromFav(id);
                                                }
                                            }}
                                        >
                                            <img src={assets.remove_icon_red} alt="Remove" />
                                        </button>
                                        <p>{favItems[id]}</p>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (checkUserLoggedIn()) {
                                                    addToFav(id);
                                                }
                                            }}
                                        >
                                            <img src={assets.add_icon_green} alt="Add" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="button-group">
                            <button
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="buy-now-btn"
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ProductDetails;