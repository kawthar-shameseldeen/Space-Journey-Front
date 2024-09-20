import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; 
import logo from '../../assets/logo2.png';
import { FaBars, FaTimes ,FaUsers, FaMicrochip  } from 'react-icons/fa';


import DeviceStatus from '../../pages/devices/devices.jsx';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    
    <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

    
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
        <img src={logo} />
        </div>
        <h2 className="sidebar-title">Space Journey</h2>
        <nav className="sidebar-nav">
  <ul>
    <li>
      <Link to="/users">
        <FaUsers size={20} />
        <span className="icon-label">Users</span> 
      </Link>
    </li>
    <li>
      <Link to="/devices">
        <FaMicrochip size={20} />
        <span className="icon-label">Devices</span>
      </Link>
    </li>
  </ul>
</nav>
      </div>
    </>
  );
};

export default Sidebar;
