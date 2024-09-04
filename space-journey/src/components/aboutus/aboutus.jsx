import React from 'react';
import './aboutus.css'; 
import { Player } from '@lottiefiles/react-lottie-player';
import spaceLottie from '../../assets/aboutus.json'; 
const AboutUs = () => {
    return (
        <div className="about-card">
             <h3>About Us</h3>
            <Player
                autoplay
                loop
                src={spaceLottie} 
                style={{ height: '200px', width: '200px', margin: '0 auto 20px' }} 
            />
           
            <p>
                Welcome to Space Journey, where space enthusiasts and students can explore the universe through immersive 3D tours and detailed information on celestial bodies. Our platform combines captivating interactive experiences with educational content, making space exploration both informative and visually stunning.
            </p>
        </div>
    );
};

export default AboutUs;
