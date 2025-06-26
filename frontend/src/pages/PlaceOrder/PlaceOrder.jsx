import React, {  useContext,useState, useEffect, useRef } from 'react';
import './PlaceOrder.css';
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
const PlaceOrder = () => {
    const {
        favItems,
        item_list,
        getTotalFavAmount,
        url,        
      } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Refs for animations
  const formRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);

  // Animation function
  const animateElement = (element, properties, duration = 0.5) => {
    if (!element) return;
    
    const startTime = Date.now();
    const startValues = {};
    
    // Get initial values
    Object.keys(properties).forEach(prop => {
      if (prop === 'y') {
        startValues[prop] = element.style.transform ? 
          parseFloat(element.style.transform.match(/translateY\(([^)]+)\)/)?.[1] || 0) : 0;
      } else if (prop === 'opacity') {
        startValues[prop] = parseFloat(getComputedStyle(element).opacity);
      }
    });
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      Object.keys(properties).forEach(prop => {
        const start = startValues[prop];
        const end = properties[prop];
        const current = start + (end - start) * easeProgress;
        
        if (prop === 'y') {
          element.style.transform = `translateY(${current}px)`;
        } else if (prop === 'opacity') {
          element.style.opacity = current;
        }
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Initialize animations on mount
  useEffect(() => {
    // Animate title
    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
      titleRef.current.style.transform = 'translateY(-30px)';
      setTimeout(() => animateElement(titleRef.current, { opacity: 1, y: 0 }, 0.8), 100);
    }

    // Animate left section
    if (leftSectionRef.current) {
      leftSectionRef.current.style.opacity = '0';
      leftSectionRef.current.style.transform = 'translateY(50px)';
      setTimeout(() => animateElement(leftSectionRef.current, { opacity: 1, y: 0 }, 0.8), 200);
    }

    // Animate right section
    if (rightSectionRef.current) {
      rightSectionRef.current.style.opacity = '0';
      rightSectionRef.current.style.transform = 'translateY(50px)';
      setTimeout(() => animateElement(rightSectionRef.current, { opacity: 1, y: 0 }, 0.8), 400);
    }

    // Animate inputs sequentially
    inputRefs.current.forEach((input, index) => {
      if (input) {
        input.style.opacity = '0';
        input.style.transform = 'translateX(-20px)';
        setTimeout(() => animateElement(input, { opacity: 1, y: 0 }, 0.5), 600 + index * 100);
      }
    });
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
    
    // Animate input on change
    const input = event.target;
    input.style.transform = 'scale(1.05)';
    setTimeout(() => {
      input.style.transform = 'scale(1)';
    }, 150);
  };

  const placeOrder = async (event) => {
  event.preventDefault();
  setIsLoading(true);

  // Animate button
  if (buttonRef.current) {
    buttonRef.current.style.transform = 'scale(0.95)';
    setTimeout(() => {
      buttonRef.current.style.transform = 'scale(1)';
    }, 150);
  }

  try {
    let orderItems = [];
    item_list.forEach((item) => {
      if (favItems[item._id] > 0) {
        // Create new object to avoid mutating original
        let itemInfo = { ...item, quantity: favItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

  
    const token = localStorage.getItem('token'); // Adjust this to your auth logic
    let endpoint ="/api/order/place";
    const newUrl = `${url}${endpoint}`;
     const response = await axios.post(newUrl, {
    address: data,
    items: orderItems,
    amount: getTotalFavAmount() + 2
  },
  {
    headers: {
      "Content-Type": "application/json",
      token: token  
    }
  }
);
    const result = response.data;

    if (result.success) {
       window.location.href = result.session_url;
      alert('Order placed successfully!');
      
    } else {
      alert('Failed to place order: ' + (result.message || 'Unknown error'));
    }
  } catch (error) {
    alert('Error placing order: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};


  const addToRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  return (
    <div className="place-order-container">
      <form ref={formRef} onSubmit={placeOrder} className="place-order-form">
        {/* Left Section - Delivery Information */}
        <div ref={leftSectionRef} className="form-section">
          <h2 ref={titleRef} className="section-title">
            🚚 Delivery Information
          </h2>
          
          <div className="form-fields">
            <div className="form-row">
              <input
                ref={addToRefs}
                required
                name='firstName'
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder='First name'
                className="form-input"
              />
              <input
                ref={addToRefs}
                required
                name='lastName'
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder='Last name'
                className="form-input"
              />
            </div>

            <input
              ref={addToRefs}
              required
              name='email'
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder='Email address'
              className="form-input"
            />

            <input
              ref={addToRefs}
              required
              name='street'
              onChange={onChangeHandler}
              value={data.street}
              type="text"
              placeholder='Street address'
              className="form-input"
            />

            <div className="form-row">
              <input
                ref={addToRefs}
                required
                name='city'
                onChange={onChangeHandler}
                value={data.city}
                type="text"
                placeholder='City'
                className="form-input"
              />
              <input
                ref={addToRefs}
                required
                name='state'
                onChange={onChangeHandler}
                value={data.state}
                type="text"
                placeholder='State'
                className="form-input"
              />
            </div>

            <div className="form-row">
              <input
                ref={addToRefs}
                required
                name='zipcode'
                onChange={onChangeHandler}
                value={data.zipcode}
                type="text"
                placeholder='Zip code'
                className="form-input"
              />
              <input
                ref={addToRefs}
                required
                name='country'
                onChange={onChangeHandler}
                value={data.country}
                type="text"
                placeholder='Country'
                className="form-input"
              />
            </div>

            <input
              ref={addToRefs}
              required
              name='phone'
              onChange={onChangeHandler}
              value={data.phone}
              type="text"
              placeholder='Phone number'
              className="form-input"
            />
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div ref={rightSectionRef} className="form-section order-summary">
          <h2 className="section-title">
            💳 Order Summary
          </h2>

          <div className="summary-content">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">${getTotalFavAmount().toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row">
              <span className="summary-label">Delivery Fee</span>
              <span className="summary-value">
                ${getTotalFavAmount() === 0 ? '0.00' : '2.00'}
              </span>
            </div>
            
            <div className="summary-divider-bold"></div>
            
            <div className="total-row">
              <span className="total-label">Total</span>
              <span className="total-value">
                ${getTotalFavAmount() === 0 ? '0.00' : (getTotalFavAmount() + 2).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            ref={buttonRef}
            type='submit'
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <div className="loading-content">
                <div className="loading-spinner"></div>
                Processing...
              </div>
            ) : (
              '🚀 PROCEED TO PAY'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;