import React from "react";
import "./features.css";
import {Player} from '@lottiefiles/react-lottie-player';
import spaceTourLottie from '../../assets/spaceTel.json'; 
import planetInfoLottie from '../../assets/iot.json'; 

const featureData = [
  {
    title: "Immersive 3D Space Tours",
    description:
      "Experience the universe like never before with our interactive 3D tours that let you explore planets, stars, and galaxies in stunning detail.",
    lottieSrc: spaceTourLottie, 
  },
  {
    title: "Detailed Planetary Information",
    description:
      "Dive into comprehensive data and fascinating facts about each celestial body, including their composition, atmosphere, history, and more.",
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
