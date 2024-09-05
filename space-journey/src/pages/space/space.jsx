import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRef, useState, useEffect } from "react";
import { Select, MenuItem, Button } from '@mui/material';

const SpaceTour = () => {
  const mountRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("milkyWay");
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [ws, setWs] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planetSound, setPlanetSound] = useState(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [blackholeSound, setBlackholeSound] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4040');
  
    ws.onopen = () => {
      console.log("WebSocket connection established");
      setWs(ws); 
    };
  
    ws.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };
  
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

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

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const milkyWayScene = new THREE.Scene();
    const solarSystemScene = new THREE.Scene();
    const blackholeScene = new THREE.Scene();
    const NebulaScene = new THREE.Scene();
    const WormHoleScene = new THREE.Scene();

    let milkyWay = null;
    let blackhole = null;
    let nebula = null;
    let wormhole = null;
    let planets = [];

    if (currentScene === "milkyWay") {
      loader.load("/milky-way/scene.gltf", (gltf) => {
        milkyWay = gltf.scene;
        milkyWay.scale.set(100, 100, 100);
        milkyWayScene.add(milkyWay);
      });
      camera.position.z = 1000;
    }

    if (currentScene === "solarSystem") {
      const ambientLight = new THREE.AmbientLight(0x404040, 5);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
      directionalLight.position.set(20, 20, 50);

      solarSystemScene.add(ambientLight);
      solarSystemScene.add(directionalLight);

      loader.load("/models/space_sun/scene.gltf", (gltf) => {
        const sun = gltf.scene;
        sun.scale.set(10, 10, 10);
        solarSystemScene.add(sun);
      });

      const createPlanet = (size, distance, texturePath, name, soundPath) => {
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const texture = textureLoader.load(texturePath);
        const material = new THREE.MeshStandardMaterial({ map: texture });
        const planet = new THREE.Mesh(geometry, material);
        planet.name = name;
        planet.userData = { soundPath };

        const orbitGeometry = new THREE.RingGeometry(distance - 0.1, distance + 0.1, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;

        planet.position.x = distance;

        solarSystemScene.add(orbit);
        solarSystemScene.add(planet);

        return planet;
      };

      planets = [
        createPlanet(1, 10, "/textures/mercury.jpg", "Mercury", "/sounds/mercurySound.mpeg.wav"),
        createPlanet(1.5, 20, "/textures/venus.jpg", "Venus", "/sounds/venusSound.mpeg.wav"),
        createPlanet(2, 30, "/textures/earth.jpg", "Earth", "/sounds/earth.mp3"),
        createPlanet(2.5, 40, "/textures/mars.jpg", "Mars", "/sounds/marsSound.mpeg.wav"),
        createPlanet(3, 50, "/models/jupiter/textures/Material_baseColor.jpg", "Jupiter", "/sounds/jupiterSound.mpeg.wav"),
        createPlanet(3.5, 60, "/textures/saturn.jpg", "Saturn", "/sounds/saturnSound.mpeg.wav"),
        createPlanet(4.5, 70, "/textures/uranus.jpg", "Uranus", "/sounds/uranusSound.mpeg.wav"),
        createPlanet(5, 80, "/textures/neptune.jpg", "neptune", "/sounds/neptuneSound.mpeg.wav"),
        createPlanet(5.5, 90, "/textures/pluto.jpg", "pluto", "/sounds/plutoSound.mpeg.wav"),
      ];

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
          const radius =
            innerRadius + Math.random() * (outerRadius - innerRadius);
          asteroid.position.x = Math.cos(angle) * radius;
          asteroid.position.z = Math.sin(angle) * radius;
          asteroid.position.y = Math.random() * 2 - 1;

          solarSystemScene.add(asteroid);
          asteroids.push(asteroid);
        }
        return asteroids;
      };

      createAsteroidBelt(40, 50, 500);

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

      createStars(10000);

      camera.position.z = 50;
    }

    if (currentScene === "blackhole") {
      loader.load("/blackhole/scene.gltf", (gltf) => {
        blackhole = gltf.scene;
        blackhole.scale.set(100, 100, 100);
        blackholeScene.add(blackhole);
      });

      const sound = new THREE.Audio(listener);
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load("/sounds/black-hole.mp3", (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        setBlackholeSound(sound);
      });

      camera.position.z = 1000;
    }

    if (currentScene === "nebula") {
      loader.load("/planetary_nebula/scene.gltf", (gltf) => {
        nebula = gltf.scene;
        nebula.scale.set(100, 100, 100);
        NebulaScene.add(nebula);
      });
      camera.position.z = 1000;
    }

    if (currentScene === "wormhole") {
      loader.load("/wormhole/scene.gltf", (gltf) => {
        wormhole = gltf.scene;
        wormhole.scale.set(100, 100, 100);
        WormHoleScene.add(wormhole);
      });
      camera.position.z = 1000;
    }

    const animate = () => {
      requestAnimationFrame(animate);

      switch (currentScene) {
        case "milkyWay":
          if (camera.position.z > 100) {
            camera.position.z -= 5;
          }
          if (milkyWay) {
            milkyWay.rotation.y += 0.001; 
          }
          renderer.render(milkyWayScene, camera);
          break;

        case "solarSystem":
          if (isAnimating) {
            planets.forEach((planet, index) => {
              planet.position.x =
                Math.cos(Date.now() * 0.001 + index) * (10 * (index + 1));
              planet.position.z =
                Math.sin(Date.now() * 0.001 + index) * (10 * (index + 1));
            });
          }
          renderer.render(solarSystemScene, camera);
          break;

        case "blackhole":
          if (blackhole) {
            blackhole.rotation.y += 0.01;
          }
          renderer.render(blackholeScene, camera);
          break;
        case "nebula":
          if (nebula) {
            nebula.rotation.y += 0.01;
          }
          renderer.render(NebulaScene, camera);
          break;
        case "wormhole":
          if (wormhole) {
            wormhole.rotation.y += 0.01;
          }
          renderer.render(WormHoleScene, camera);
          break;

        default:
          renderer.render(milkyWayScene, camera);
          break;
      }
    };

    animate();

    const onDocumentMouseMove = (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(planets);

      if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        if (selectedObject.name) {
          setSelectedPlanet(selectedObject);

          // Send WebSocket message on hover
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ planetName: selectedObject.name }));
            console.log(`Sent planet name: ${selectedObject.name}`);  
          } else {
            console.error("WebSocket is not open.");
          }
        }
      }
    };

    const onDocumentClick = (event) => {
      event.preventDefault();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets);

      if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        if (selectedObject.name) {
          setSelectedPlanet(selectedObject);
          setIsModalOpen(true);
        }
      }
    };

    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("mousedown", onDocumentClick, false);

    return () => {
      document.removeEventListener("mousedown", onDocumentClick, false);
      document.removeEventListener("mousemove", onDocumentMouseMove, false);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [currentScene, ws, isAnimating]);

  const playPlanetSound = () => {
    if (selectedPlanet && selectedPlanet.userData.soundPath) {
      const sound = new Audio(selectedPlanet.userData.soundPath);
      setPlanetSound(sound);
      sound.play();
      setIsSoundPlaying(true);
    }
  };

  const stopPlanetSound = () => {
    if (planetSound) {
      planetSound.pause();
      planetSound.currentTime = 0;
      setIsSoundPlaying(false);
    }
  };

  const toggleBlackholeSound = () => {
    if (blackholeSound) {
      if (isSoundPlaying) {
        blackholeSound.stop();
      } else {
        blackholeSound.play();
      }
      setIsSoundPlaying(!isSoundPlaying);
    }
  };

  return (
    <div>
      <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
      <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '10px', flexDirection: 'row-reverse' }}>
        <Select
          value={currentScene}
          onChange={(e) => setCurrentScene(e.target.value)}
          style={{ backgroundColor: '#61dbfb', color: '#232323', borderRadius: '5px', fontSize: '15px' }}
        >
          <MenuItem value="milkyWay">Milky Way</MenuItem>
          <MenuItem value="solarSystem">Solar System</MenuItem>
          <MenuItem value="blackhole">Black Hole</MenuItem>
          <MenuItem value="nebula">Nebula</MenuItem>
          <MenuItem value="wormhole">Wormhole</MenuItem>
        </Select>

        {currentScene === 'blackhole' && (
          <Button
            onClick={toggleBlackholeSound}
            style={{ backgroundColor: '#61dbfb', color: '#232323', borderRadius: '5px', fontSize: '12px' }}
          >
            {isSoundPlaying ? 'Stop Sound' : 'Play Sound'}
          </Button>
        )}

        <Button
          onClick={() => setIsAnimating(!isAnimating)}
          style={{ backgroundColor: '#61dbfb', color: '#232323', borderRadius: '5px', padding: '5px 10px', fontSize: '12px' }}
        >
          {isAnimating ? 'Stop Animation' : 'Start Animation'}
        </Button>
      </div>
      {isModalOpen && (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#232323", 
      color: "#fff",
      padding: "20px",
      borderRadius: "10px",
      width: "300px", 
      textAlign: "center", 
    }}
  >
    <h2>{selectedPlanet?.name}</h2>
    <p>Do you want to play the sound of this planet?</p>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between", 
        marginTop: "20px",
      }}
    >
      <button
        onClick={() => setIsModalOpen(false)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f00", 
          color: "#fff",
          border: "none",
          cursor: "pointer",
          flex: 1,
          marginRight: "10px", 
          borderRadius: "5px",
        }}
      >
        Cancel
      </button>

      <button
        onClick={() => {
          if (isSoundPlaying) {
            stopPlanetSound();
          } else {
            playPlanetSound(); 
          }
          setIsModalOpen(false);
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#61dbfb", 
          color: "#fff",
          border: "none",
          cursor: "pointer",
          flex: 1, 
          borderRadius: "5px",
        }}
      >
        {isSoundPlaying ? "Stop Sound" : "Play Sound"}
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default SpaceTour;
