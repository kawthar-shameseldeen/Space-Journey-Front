import React from 'react';
import './aboutus.css'; 
import { Player } from '@lottiefiles/react-lottie-player';
import spaceLottie from '../../assets/aboutusA.json'; 
const AboutUs = () => {
    return (
        <div className="about-card">
             
           <div className='aboutTitleContainer'>
           <Player
                autoplay
                loop
                src={spaceLottie} 
                style={{ height: '200px', width: '200px'}} 
            />
            <h3 className='aboutTitle'>About Us</h3>
           </div>
           <div className='aboutTextContainer'> 
           <p >
            Welcome to Space Journey, a platform where space enthusiasts can explore a 3D space tour with real-time IoT integration.
             Experience planets up close as dynamic lighting effects bring them to life, combining immersive visuals with interactive technology.
            </p>
           </div>
        </div>
    );
};

export default AboutUs;
