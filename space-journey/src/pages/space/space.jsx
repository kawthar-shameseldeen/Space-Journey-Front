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
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 1000);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.zoomSpeed = 1.5;

    const milkyWayScene = new THREE.Scene();
    const solarSystemScene = new THREE.Scene();
    const blackholeScene = new THREE.Scene();

    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let blackhole = null;
    if (currentScene === "milkyWay") {
      loader.load("/milky-way/scene.gltf", (gltf) => {
        const milkyWay = gltf.scene;
        milkyWay.scale.set(100, 100, 100);
        milkyWayScene.add(milkyWay);
      });
      camera.position.z = 1000;
    }
    if (currentScene === "blackhole") {
        loader.load("/blackhole/scene.gltf", (gltf) => {
          blackhole = gltf.scene;
          blackhole.scale.set(100, 100, 100);
          blackholeScene.add(blackhole);
        });
        camera.position.z = 1000;
      }

      let planets = [];
      if (currentScene === "solarSystem") {
        const ambientLight = new THREE.AmbientLight(0x404040, 5);
        solarSystemScene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(20, 20, 50);
        solarSystemScene.add(directionalLight);

        const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        solarSystemScene.add(sun);
        const createPlanet = (size, distance, texturePath, name) => {
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            const texture = textureLoader.load(texturePath);
            const material = new THREE.MeshStandardMaterial({ map: texture });
            const planet = new THREE.Mesh(geometry, material);
            planet.name = name;
            const orbitGeometry = new THREE.RingGeometry(
              
              );
          
          };
    
      }
  


  ///////////////////////////////////////  
  });
};
export default SpaceTour;
