import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 
import logo from '../../assets/logo.png';
const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
            <img src={logo} alt="Logo" className="logo-image" />
            </div>
            <ul className="navbar-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/tour">Tour</Link></li>
                <li><Link to="/space">Space</Link></li>
            </ul>
           
        </nav>
    );
    
};
