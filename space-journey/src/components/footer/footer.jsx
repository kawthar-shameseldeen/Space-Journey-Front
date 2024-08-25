import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-links">
                    <a href="#contact">Contact Us</a>
                    <a href="#about">About Us</a>
                </div>
                <div className="footer-logo">
                    <h2>SpaceJourney</h2>
                </div>
                <div className="footer-links">
                    <a href="#features"><Link to="/features">Features</Link></a>
                    <a href="#terms">Terms of Use</a>
                </div>
            </div>
           
        </footer>
    );
    
};

export default Footer;
