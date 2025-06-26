import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" style={{height:120, width:120}} />
                    <p>Explore our extensive selection of premium products curated to elevate your shopping experience and satisfy your every need with quality and convenience. Indulge in a seamless shopping journey where quality meets convenience, and your satisfaction is our top priority.</p>
                    <div className="footer-social-icons">
                        <a
              href="https://www.facebook.com/profile.php?id=100024670202929"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>

            <a
              href="https://www.linkedin.com/in/vicky-kumar-691a92222/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Our Products</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-7710194734</li>
                        <li>vk2388275@gmail.com</li>
                        <li>contact@nexastore.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2025 Nexa Store.com ..  All Right Reserved</p>
        </div>
    )
}

export default Footer
