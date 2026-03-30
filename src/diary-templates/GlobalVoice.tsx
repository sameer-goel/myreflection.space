import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// --- Types ---
interface CountryInfo {
  lat: number;
  lon: number;
  color: number;
  sender: string;
  message: string;
  tag: string;
}

interface CountryDataMap {
  [key: string]: CountryInfo;
}

// --- Constants & Data ---
const GLOBE_RADIUS = 100;

const countryData: CountryDataMap = {
  'USA': {
    lat: 37.0902, lon: -95.7129, color: 0x3b82f6,
    sender: "Sarah Jenkins",
    message: "Greetings from the land of opportunity! If you're ever in the States, make sure to visit our beautiful National Parks. The views are truly out of this world!",
    tag: "North America"
  },
  'UK': {
    lat: 55.3781, lon: -3.4360, color: 0x10b981,
    sender: "Oliver Smith",
    message: "Cheers from London! Don't mind the rain, it just makes the countryside greener. Fancy a spot of tea while you're orbiting?",
    tag: "Europe"
  },
  'Japan': {
    lat: 36.2048, lon: 138.2529, color: 0xf43f5e,
    sender: "Hina Tanaka",
    message: "Kon'nichiwa! Our cherry blossoms are starting to bloom. Japan is a mix of ancient tradition and high-tech future. Please come visit soon!",
    tag: "Asia"
  },
  'Australia': {
    lat: -25.2744, lon: 133.7751, color: 0xf59e0b,
    sender: "Jack Cooper",
    message: "G'day mate! Sending love from the Outback. Keep an eye out for the Great Barrier Reef from up there, it's a sight to behold!",
    tag: "Oceania"
  },
  'Brazil': {
    lat: -14.2350, lon: -51.9253, color: 0x84cc16,
    sender: "Thiago Silva",
    message: "Bem-vindo! The energy in Brazil is unmatched. From the Amazon rainforest to the beaches of Rio, we welcome you with open arms and music!",
    tag: "South America"
  }
};

const App: React.FC = () => {
  // Refs for Three.js objects
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);

  // State for interaction
  const [isDragging, setIsDragging] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.0015);
  const [activeCountry, setActiveCountry] = useState<{ name: string; data: CountryInfo } | null>(null);

  // Internal animation state (refs used to avoid closure staleness in loop)
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetQuaternion = useRef(new THREE.Quaternion());

  // --- Helper Functions ---
  const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const addMarker = (globe: THREE.Mesh, lat: number, lon: number, color: number) => {
    const pos = latLonToVector3(lat, lon, GLOBE_RADIUS);

    const markerGeo = new THREE.SphereGeometry(1.5, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.copy(pos);

    const ringGeo = new THREE.RingGeometry(2, 2.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(pos);
    ring.lookAt(new THREE.Vector3(0, 0, 0));

    globe.add(marker);
    globe.add(ring);
  };

  const flyToCountry = (name: string) => {
    const data = countryData[name];
    if (!data || !cameraRef.current || !globeRef.current) return;

    setActiveCountry(null); // Hide existing modal
    setIsFlying(true);
    setRotationSpeed(0);

    const destPos = latLonToVector3(data.lat, data.lon, GLOBE_RADIUS);
    const targetVec = destPos.clone().normalize();
    const cameraVec = new THREE.Vector3(0, 0, 1);

    targetQuaternion.current.setFromUnitVectors(targetVec, cameraVec);

    // Zoom Logic
    const zoomInterval = setInterval(() => {
      if (cameraRef.current && cameraRef.current.position.z > 200) {
        cameraRef.current.position.z -= 4;
      } else {
        clearInterval(zoomInterval);
      }
    }, 16);

    setTimeout(() => {
      setIsFlying(false);
      setRotationSpeed(0.0003);
      setActiveCountry({ name, data });
    }, 2000);
  };

  // --- Initialize Three.js ---
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 350;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const sun = new THREE.DirectionalLight(0xffffff, 0.6);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    // Globe
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    const bumpTexture = loader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');

    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 2,
      shininess: 5
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    globeRef.current = globe;

    // Markers
    Object.keys(countryData).forEach(key => {
      addMarker(globe, countryData[key].lat, countryData[key].lon, countryData[key].color);
    });

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const starVertices = [];
    for (let i = 0; i < 7000; i++) {
      starVertices.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = stars;

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Animation Loop (Separate from init to handle state cleanly)
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        if (isFlying && globeRef.current) {
          globeRef.current.quaternion.slerp(targetQuaternion.current, 0.05);
        } else if (!isDragging && globeRef.current) {
          globeRef.current.rotation.y += rotationSpeed;
        }

        if (starsRef.current) starsRef.current.rotation.y += 0.0001;

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFlying, isDragging, rotationSpeed]);

  // --- Interaction Event Handlers ---
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    setActiveCountry(null);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !isFlying && globeRef.current) {
      const deltaMove = {
        x: e.clientX - previousMousePosition.current.x,
        y: e.clientY - previousMousePosition.current.y
      };
      globeRef.current.rotation.y += deltaMove.x * 0.005;
      globeRef.current.rotation.x += deltaMove.y * 0.005;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      setRotationSpeed(0);
    }
  };

  const onMouseUp = () => setIsDragging(false);

  const onWheel = (e: React.WheelEvent) => {
    if (cameraRef.current) {
      cameraRef.current.position.z += e.deltaY * 0.15;
      cameraRef.current.position.z = Math.max(120, Math.min(cameraRef.current.position.z, 600));
      setActiveCountry(null);
    }
  };

  const colorTagMap: { [key: string]: string } = {
    'USA': 'bg-blue-500/20 text-blue-400',
    'UK': 'bg-emerald-500/20 text-emerald-400',
    'Japan': 'bg-rose-500/20 text-rose-400',
    'Australia': 'bg-amber-500/20 text-amber-400',
    'Brazil': 'bg-lime-500/20 text-lime-400'
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">

      {/* UI Overlay: Header */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h1 className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Global Explorer TS
        </h1>
        <p className="text-slate-400 text-sm mt-1">Interactive React + TypeScript Planetary Engine</p>
      </div>

      {/* UI Overlay: Country Navigation */}
      <div className="absolute bottom-6 left-0 w-full px-6 z-10 flex gap-3 overflow-x-auto pb-4 scrollbar-hide pointer-events-none">
        {Object.keys(countryData).map((country) => (
          <button
            key={country}
            onClick={() => flyToCountry(country)}
            className="pointer-events-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl min-w-[140px] text-left hover:border-sky-400 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
              {countryData[country].tag}
            </span>
            <span className="text-white font-medium">{country}</span>
          </button>
        ))}
      </div>

      {/* Modal Section */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] transition-all duration-500 ease-out 
          ${activeCountry ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
      >
        {activeCountry && (
          <div className="bg-slate-900/95 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setActiveCountry(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${colorTagMap[activeCountry.name]}`}>
              {activeCountry.data.tag}
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{activeCountry.name}</h2>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl border border-white/10">👤</div>
              <div>
                <p className="text-white text-sm font-semibold">{activeCountry.data.sender}</p>
                <p className="text-slate-400 text-xs">Verified Explorer</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-xl italic text-slate-300 text-sm leading-relaxed mb-6 border border-white/5">
              "{activeCountry.data.message}"
            </div>

            <button
              onClick={() => setActiveCountry(null)}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg"
            >
              Back to Orbit
            </button>
          </div>
        )}
      </div>

      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      />
    </div>
  );
};

export default App;