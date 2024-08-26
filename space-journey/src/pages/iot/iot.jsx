import {useState,useEffect} from 'react';

import './iot.css'; 
import deviceImage from '../../assets/iotImage.png';
import Navbar from '../../components/navbar/navbar.jsx';

const IoTPage = () => {
  
    return (
      <div>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="iot-page">
            <div className="iot-container">
                <div className="iot-content">
                    <h2>Connect your IoT devices</h2>
                    <p>
                        for an interactive 3D space tour, <br />
                        featuring real-time updates and seamless control.
                    </p>
                    <button className="connect-button">Connect</button>
                </div>
                <div className="iot-image">
                    <img src={deviceImage} alt="IoT Device" />
                </div>
            </div>
        </div>
      </div>
    );
};

export default IoTPage;
