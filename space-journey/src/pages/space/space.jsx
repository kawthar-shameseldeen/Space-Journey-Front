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
          distance - 0.1,
          distance + 0.1,
          64
        );

        const orbitMaterial = new THREE.MeshBasicMaterial({
          color: 0x888888,
          side: THREE.DoubleSide,
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        planet.position.x = distance;

        solarSystemScene.add(orbit);
        solarSystemScene.add(planet);

        return planet;
      };
      const createAsteroidBelt = (innerRadius, outerRadius, numAsteroids) => {
        const asteroids = [];
        for (let i = 0; i < numAsteroids; i++) {
          const size = Math.random() * 0.5 + 0.1;
          const asteroidGeometry = new THREE.SphereGeometry(size, 16, 16);
          const asteroidMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
          });
          const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
          const angle = Math.random() * 2 * Math.PI;
          const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
          asteroid.position.x = Math.cos(angle) * radius;
          asteroid.position.z = Math.sin(angle) * radius;
          asteroid.position.y = Math.random() * 2 - 1;
          solarSystemScene.add(asteroid);
          asteroids.push(asteroid);
        }
        return asteroids;
      };
      const createStars = (count = 1000) => {
        for (let i = 0; i < count; i++) {
            const starGeometry = new THREE.SphereGeometry(0.5, 24, 24);
            const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const star = new THREE.Mesh(starGeometry, starMaterial);
            star.position.set(
                (Math.random() - 0.5) * 4000,
                (Math.random() - 0.5) * 4000,
                (Math.random() - 0.5) * 4000
              );
              solarSystemScene.add(star);
          }
       
      };
      planets = [
        createPlanet(1, 10, "/textures/mercury.jpg", "mercury"),
        createPlanet(1.5, 20, "/textures/venus.jpg", "venus"),
        createPlanet(2, 30, "/textures/earth.jpg", "earth"),
        createPlanet(2.5, 40, "/textures/mars.jpg", "mars"),
        createPlanet(3, 50, "/textures/jupiter.jpg", "jupiter"),
        createPlanet(3.5, 60, "/textures/saturn.jpg", "saturn"),
        createPlanet(4.5, 70, "/textures/uranus.jpg", "uranus"),
        createPlanet(5, 80, "/textures/neptune.jpg", "neptune"),
        createPlanet(5.5, 90, "/textures/pluto.jpg", "pluto"),
      ];

    }

  });

};
export default SpaceTour;
