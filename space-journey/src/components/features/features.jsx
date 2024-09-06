import React from "react";
import "./features.css";
import {Player} from '@lottiefiles/react-lottie-player';
import spaceTourLottie from '../../assets/spaceTel.json'; 
import planetInfoLottie from '../../assets/iot.json'; 

const featureData = [
  {
    title: "Immersive 3D Space Tours",
    description:
      "Explore the universe with our interactive 3D space tours. Navigate through detailed planets, stars, and galaxies. Perfect for space explorers and adventurers, offering visual wonders and unforgettable experiences.",

    lottieSrc: spaceTourLottie, 
  },
  {
    title: "IoT-Powered Planet Lighting",
    description:
      "Experience a new level of interactivity as you explore the planets in real-time. Hover over each planet to activate IoT-driven lights, bringing them to life with a stunning visual display synced to your actions.",
    lottieSrc: planetInfoLottie,  
  },
];

const Features = () => {
  return (
    <div className="features-section">
      <div className="features-container">
        {featureData.map((feature, index) => (
          <div key={index} className="features-card">
           
            <Player
              autoplay
              loop
              src={feature.lottieSrc}
              style={{ height: '200px', width: '200px' }} 
            />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
