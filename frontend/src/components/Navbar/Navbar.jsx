import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import gsap from 'gsap';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { getTotalFavAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const navbarRef = useRef();
  const searchInputRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    gsap.from(navbarRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowDropdown(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='navbar' ref={navbarRef}>
      <Link to='/'>
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      
      <ul className={`navbar-menu ${isMobile ? 'mobile' : ''}`}>
        <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <Link to='/product' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Product</Link>
        <Link to='/contact' onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>Contact Us</Link>
        <Link to="/about" onClick={() => setMenu("About")} className={menu === "About" ? "active" : ""}>About</Link>
      </ul>

      <div className="navbar-right">
        {/* Search functionality */}
        <div className={`search-container ${showSearch ? 'active' : ''}`}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            className="search-input"
          />
          <img 
            src={showSearch ? assets.close_icon : assets.search_icon} 
            alt="search" 
            onClick={toggleSearch}
            className="search-icon"
          />
        </div>

        {/* Favorites with badge */}
        <div className="navbar-fav-icon">
          <Link to='/fav'>
            <img src={assets.fav_icon} alt="fav" />
            {getTotalFavAmount() > 0 && (
              <div className="fav-badge">{getTotalFavAmount()}</div>
            )}
          </Link>
        </div>

        {/* User profile or sign in */}
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="sign-in-btn">Sign In</button>
        ) : (
          <div className='navbar-profile' ref={dropdownRef}>
            <img 
              src={assets.profile_icon} 
              alt="profile" 
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => {navigate('/profile'); setShowDropdown(false);}}>
                  <img src={assets.profile_icon} alt="profile" />
                  <p>Profile</p>
                </li>
                <li onClick={() => {navigate('/orders'); setShowDropdown(false);}}>
                  <img src={assets.order_icon} alt="orders" />
                  <p>Orders</p>
                </li>
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;