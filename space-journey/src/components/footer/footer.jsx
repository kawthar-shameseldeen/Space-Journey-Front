import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footerContainer">
      <footer className="footer">
        <div className="footer-title">
          <h2>SpaceJourney</h2>
        </div>
        <div className="footer-content">
     
          <div className="footer-links">
            <Link to="/">Contact US</Link>
            <Link to="/">About Us</Link>
            <Link to="/">Features</Link>
            <Link to="/">Terms of Use</Link>
          </div>
        
          <div className="footer-social">
            <div className="social-icons">
              <a href="#facebook" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#twitter" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#whatsapp" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
        
      </footer>
    </div>
  );
};

export default Footer;
