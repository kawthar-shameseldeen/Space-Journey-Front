import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; 
import { FaBars, FaTimes } from 'react-icons/fa';
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
          <img src="../../assets/logo2.png"  />
        </div>
        <h2 className="sidebar-title">Space Journey</h2>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/devices">Devices</Link></li>
            
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
