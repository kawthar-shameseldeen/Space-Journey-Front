import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
const SpaceTour = () => {
    const mountRef = useRef(null);
    const [currentScene, setCurrentScene] = useState("milkyWay");
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [planetInfo, setPlanetInfo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [planetData, setPlanetData] = useState({});
    useEffect(() => {
    
      })
    



}
export default SpaceTour;