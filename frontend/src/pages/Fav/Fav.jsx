import React, { useContext, useState, useEffect } from "react";
import "./Fav.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

const Fav = () => {
  const {
    favItems,
    item_list,
    increaseFavQty,
    decreaseFavQty,
    removeFromFav,
    getTotalFavAmount,
    url,
  } = useContext(StoreContext);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("favDarkMode") === "true" || false;
  });

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("favDarkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={`fav ${darkMode ? "dark-mode" : ""}`}>
      {/* Dark Mode Toggle */}
      <div className="dark-mode-toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round"></span>
        </label>
        <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </div>

      {/* Favorite Items */}
      <div className="fav-items">
        <div className="fav-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {item_list.map((item) => {
          if (favItems[item._id]) {
            return (
              <div key={item._id} className="fav-items-row">
                <div className="fav-items-item">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="fav-img"
                  />
                  <p className="fav-name">{item.name}</p>
                  <p className="fav-price">${item.price}</p>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseFavQty(item._id)}>
                      <FaMinus />
                    </button>
                    <span>{favItems[item._id]}</span>
                    <button onClick={() => increaseFavQty(item._id)}>
                      <FaPlus />
                    </button>
                  </div>

                  <p className="fav-total">
                    ${(item.price * favItems[item._id]).toFixed(2)}
                  </p>

                  {/* Remove completely */}
                  <button
                    onClick={() => removeFromFav(item._id)}
                    className="remove-btn"
                    aria-label={`Remove ${item.name} from favorites`}
                  >
                    &#10005;
                  </button>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Summary and Promo Code */}
      <div className="fav-bottom">
        <div className="fav-total">
          <h2>Favorites Summary</h2>
          <div className="fav-total-details">
            <p>Subtotal</p>
            <p>${getTotalFavAmount().toFixed(2)}</p>
          </div>
          <hr />
          <div className="fav-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalFavAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="fav-total-details">
            <b>Total</b>
            <b>
              ${getTotalFavAmount() === 0 ? 0 : (getTotalFavAmount() + 2).toFixed(2)}
            </b>
          </div>
          <button
  onClick={() => {
    if (getTotalFavAmount() > 0) {
      navigate("/order");
    } else {
      alert("Your favourites list is empty!");
    }
  }}
  className="checkout-btn"
>
  PROCEED TO CHECKOUT
</button>

        </div>

        <div className="fav-promocode">
          <p>If you have a promo code, enter it here.</p>
          <div className="fav-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button className="promo-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fav;
