import React from 'react';
import { Link ,useLocation} from 'react-router-dom';
import './navbar.css'; 
import logo from '../../assets/logo.png';
const Navbar = ({ isAuthenticated, onLogout }) => {
    
    const location=useLocation();
    const isAuthPage =location.pathname ==='/login' || location.pathname==='/';

    return (
      <div className='navbarContainer'>
          <nav className="navbarB">
            <div className="navbar-logoB">
            <img src={logo} alt="Logo" className="logo-imageB" />
            </div>
            <ul className="navbar-linksB">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/tour">Tour</Link></li>
                <li><Link to="/space">Space</Link></li>
                <li><Link to="/iot">Iot</Link></li>
            </ul>
            <div className="navbar-buttonsB">
            {!isAuthenticated && !isAuthPage && (
                    <>
                        <button className="btn-loginB"><Link to="/login">Login</Link></button>
                        <button className="btn-signupB"><Link to="/">Sign Up</Link></button>
                    </>
                )}
                {isAuthenticated && (
                    <button className="btn-logoutB" onClick={onLogout}>Logout</button>
                )}
            </div>
        </nav>
      </div>
    );
    
};
export default Navbar;