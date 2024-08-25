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
               
            </div>
           
        </footer>
    );
    
};

export default Footer;
