
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './iot.css'; 
import deviceImage from '../../assets/iotImage.png';
import Navbar from '../../components/navbar/navbar.jsx';

const IoTPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleConnect = () => {
    const socket = new WebSocket('ws://localhost:4040');
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      setConnected(true);
      socket.send("Client connected to IoT");
    };

    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

  };


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
            {!connected ? (
              <button 
                className="connect-button"
                onClick={handleConnect}
              >
                Connect
              </button>
            ) : (
              <button 
                className="disconnect-button"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            )}
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


