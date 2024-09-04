import React from 'react';
import './aboutus.css'; 
import { Player } from '@lottiefiles/react-lottie-player';
import spaceLottie from '../../assets/aboutus.json'; 
const AboutUs = () => {
    return (
        <div className="about-card">
            <Player
                autoplay
                loop
                src={spaceLottie}  // Path to your Lottie animation file
                style={{ height: '150px', width: '150px', margin: '0 auto 20px' }}  // Adjust size and margin
            />
            <h3>About Us</h3>
            <p>
                Welcome to Space Journey, where space enthusiasts and students can explore the universe through immersive 3D tours and detailed information on celestial bodies. Our platform combines captivating interactive experiences with educational content, making space exploration both informative and visually stunning.
            </p>
        </div>
    );
};

export default AboutUs;
