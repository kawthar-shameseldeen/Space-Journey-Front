import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import './navbar.css'; 
import logo from '../../assets/logo.png';

const Navbar = ({ isAuthenticated, onLogout, onLoginClick, onSignupClick }) => {
    
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const [isAdmin, setIsAdmin] = useState(false); 

    useEffect(() => {
     
        const token = localStorage.getItem('token'); 
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.role === 'admin') { 
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [isAuthenticated]);

    return (
      <div className='navbarContainer'>
          <nav className="navbarB">
            <div className="navbar-logoB">
              <img src={logo} alt="Logo" className="logo-imageB" />
            </div>
            <ul className="navbar-linksB">
                <li><a href="/">Home</a></li>
                <li><a href="/space">Space</a></li>
                <li><a href="/iot">IoT</a></li>
                {isAdmin && ( 
                  <li><a href="/admin">Dashboard</a></li>
                )}
            </ul>
            <div className="navbar-buttonsB">
            {!isAuthenticated && !isAuthPage && (
                <>
                    <button className="btn-linkB" onClick={onLoginClick}>Login</button>
                    <button className="btn-linkB" onClick={onSignupClick}>Sign Up</button>
                </>
            )}
            {isAuthenticated && (
                <button className="btn-linkB" onClick={onLogout}>Logout</button>
            )}
            </div>
        </nav>
      </div>
    );
};

export default Navbar;
