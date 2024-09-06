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
                src={spaceLottie} 
                style={{ height: '250px', width: '250px', margin: '0 auto 20px' }} 
            />
            <h3 className='aboutTitle'>About Us</h3>
            <p className='aboutText'>
            Welcome to Space Journey, a platform where space enthusiasts can explore a 3D space tour with real-time IoT integration.
             Experience planets up close as dynamic lighting effects bring them to life, combining immersive visuals with interactive technology.
            </p>
        </div>
    );
};

export default AboutUs;
