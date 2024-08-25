import { useState , useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./home.css";
import Navbar from "../../compnents/navbar/navbar.jsx";
import AboutUs from "../../compnents/aboutus/aboutus.jsx";
import Features from "../../compnents/features/features.jsx";
import Footer from "../../compnents/footer/footer.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const particlesInit = async (main) => {
      await loadFull(main);
    };
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate=useNavigate();
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
    return (
      <div className="home-container">
      
      </div>
    );
  };
  
  export default HomePage;
  