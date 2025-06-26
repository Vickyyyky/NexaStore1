import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../context/StoreContext'; // ✅ FIXED: Import only context
import gsap from 'gsap';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navbarRef = useRef();
  const navigate = useNavigate();

  // ✅ Access context
  const store = useContext(StoreContext);

  // ✅ Fallback if context is not yet ready
  if (!store) return null;

  const { getTotalFavAmount, token, setToken } = store;

  useEffect(() => {
    // GSAP animation on mount
    gsap.from(navbarRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Responsive state update
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className='navbar' ref={navbarRef}>
      <Link to='/'>
        <img src={assets.logo} alt="logo" className="logo" style={{ marginLeft: 25 }} />
      </Link>

      <ul className={`navbar-menu ${isMobile ? 'mobile' : ''}`}>
        <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <Link to='/product' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Product</Link>
        <Link to='/contact' onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>Contact Us</Link>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />

        <div className="navbar-search-icon">
          <Link to='/fav'><img src={assets.fav_icon} alt="fav" /></Link>
          {getTotalFavAmount() > 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
