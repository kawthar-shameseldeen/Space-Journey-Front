import React from "react";
import "./features.css";

const featureData = [
  {
    title: "Immersive 3D Space Tours",
    description:
      "Experience the universe like never before with our interactive 3D tours that let you explore planets, stars, and galaxies in stunning detail.",
  },
  {
    title: "Detailed Planetary Information",
    description:
      "Dive into comprehensive data and fascinating facts about each celestial body, including their composition, atmosphere, history, and more.",
  },
];

const Features = () => {
  return (
    <div className="features-section">
      <div className="features-container">
        {featureData.map((feature, index) => (
          <div key={index} className="features-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
