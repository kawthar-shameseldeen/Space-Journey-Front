import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                
                <div className="footer-logo">
                    <h2>SpaceJourney</h2>
                </div>
               
            </div>
            <div className="footer-bottom">
                <div className="social-icons">
                    <a href="#facebook"><i className="fab fa-facebook"></i></a>
                    <a href="#instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#whatsapp"><i className="fab fa-whatsapp"></i></a>
                </div>
                <p>&copy; SpaceJourney, Inc. 2024. We love our users!</p>
            </div>
        </footer>
    );
};

export default Footer;
