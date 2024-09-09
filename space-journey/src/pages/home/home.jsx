import React, { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./home.css";
import Navbar from "../../components/navbar/navbar.jsx";
import AboutUs from "../../components/aboutus/aboutus.jsx";
import Features from "../../components/features/features.jsx";
import Footer from "../../components/footer/footer.jsx";
import Modal from "../../components/modal/modal.jsx";
import Login from "../login/login.jsx";
import Signup from "../signup/signup.jsx";
import { useNavigate } from "react-router-dom";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const HomePage = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tourId");
    setIsAuthenticated(false);
    navigate("/");
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    closeModal();
  };

  return (
    <div className="home-container">
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLoginClick={() =>
          openModal(<Login onLoginSuccess={handleAuthSuccess} />)
        }
        onSignupClick={() =>
          openModal(<Signup onSignupSuccess={handleAuthSuccess} />)
        }
        style={{ zIndex: 1000, position: "fixed", top: 0, width: "100%" }}
      />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          particles: {
            number: {
              value: 1000,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#61dbfb",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 3,
              anim: {
                enable: true,
                speed: 2,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              anim: {
                enable: true,
                speed: 5,
                size_min: 0.3,
                sync: false,
              },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
              },
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 50,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
          background: {
            color: "#000000",
          },
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
        }}
      />

      <section className="hero-section full-page-section">
        <div className="content">
          <h1>Hello Universe</h1>
        </div>
      </section>
      <Parallax pages={2} style={{ top: "100px", left: "0", position: "absolute", zIndex:0 }}>
  <ParallaxLayer
    offset={0.1}
    speed={0.5}
    style={{
      justifyContent: "flex-start",
      alignItems: "flex-end",
      display: "flex",
      paddingLeft: "600px", 
      zIndex: -1,
    }}
  >
    <div className="planet" id="mercury"></div>
  </ParallaxLayer>

  <ParallaxLayer
    offset={0.2}
    speed={0.8}
    style={{
      justifyContent: "center",
      alignItems: "flex-start",
      display: "flex",
      paddingTop: "1000px",
      zIndex: 2,
      position: "relative",
      
    }}
  >
    <div className="planet" id="venus"></div>
  </ParallaxLayer>

  <ParallaxLayer
    offset={0.3}
    speed={0.6}
    style={{
      justifyContent: "flex-start",
      alignItems: "flex-end",
      display: "flex",
      paddingLeft: "400px", 
      zIndex: 3,
    }}
  >
    <div className="planet" id="earth"></div>
  </ParallaxLayer>

  <ParallaxLayer
    offset={0.4}
    speed={0.7}
    style={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      paddingTop: "60px",
      zIndex: 4,
    }}
  >
    <div className="planet" id="mars"></div>
  </ParallaxLayer>

  <ParallaxLayer
    offset={0.5}
    speed={0.5}
    style={{
      justifyContent: "flex-start",
      alignItems: "flex-end",
      display: "flex",
      paddingLeft: "1200px", 
      zIndex: 5,
      overflow: "visible",
    }}
  >
    <div className="planet" id="jupiter"></div>
  </ParallaxLayer>

  <ParallaxLayer
    offset={0.6}
    speed={0.6}
    style={{
      justifyContent: "flex-start",
      alignItems: "center",
      display: "flex",
      paddingLeft: "60px", 
      zIndex: 6,
     
      
    }}
  >
    <div className="planet" id="saturn"></div>
  </ParallaxLayer>

  <ParallaxLayer
    offset={0.7}
    speed={0.8}
    style={{
      justifyContent: "center",
      alignItems: "flex-end",
      display: "flex",
      paddingBottom: "80px", 
      zIndex: 7,
    }}
  >
    <div className="planet" id="uranus"></div>
  </ParallaxLayer>

  <ParallaxLayer
    offset={0.8}
    speed={0.9}
    style={{
      justifyContent: "flex-start",
      alignItems: "flex-end",
      display: "flex",
      paddingLeft: "200px", 
     
      zIndex: 8,
    }}
  >
    <div className="planet" id="pluto"></div>
  </ParallaxLayer>
</Parallax>

      <section className="about-us-section full-page-section">
        <div className="content">
          <AboutUs />
        </div>
      </section>
      <section className="features-section full-page-section">
        <div className="content">
          <Features />
        </div>
      </section>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
      <Footer />
    </div>
  );
};

export default HomePage;
