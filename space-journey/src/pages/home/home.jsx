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
    setIsAuthenticated(false);
    navigate("/home");
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
      <Parallax pages={2} style={{ top: "100px", left: "0", position: "absolute", zIndex: 0 }}>
        
        <ParallaxLayer
          offset={0.1}
          speed={0.5}
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            display: "flex",
            zIndex: -1,
            
          }}
        >
          <div className="planet" id="mercury"></div>
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

      <Footer />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default HomePage;
