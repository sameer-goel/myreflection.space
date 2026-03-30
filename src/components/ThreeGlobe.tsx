import React, { useEffect, useRef, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';
import * as THREE from 'three';

// Sample GeoJSON URL for country shapes
const GEOJSON_URL = 'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson';

interface Pin {
  lat: number;
  lng: number;
  name: string;
  color: string;
  size: number;
}

const PINS: Pin[] = [
  { lat: 37.0902, lng: -95.7129, name: 'United States', color: '#FF5E5E', size: 0.8 },
  { lat: 55.3781, lng: -3.4360, name: 'United Kingdom', color: '#FFB84D', size: 0.6 },
  { lat: 20.5937, lng: 78.9629, name: 'India', color: '#4DFF88', size: 0.7 },
  { lat: 51.1657, lng: 10.4515, name: 'Germany', color: '#4DB8FF', size: 0.6 },
  { lat: 35.6762, lng: 139.6503, name: 'Japan', color: '#B84DFF', size: 0.6 },
  { lat: -14.2350, lng: -51.9253, name: 'Brazil', color: '#FF5E5E', size: 0.7 },
  { lat: -25.2744, lng: 133.7751, name: 'Australia', color: '#FFB84D', size: 0.7 },
  { lat: 48.8566, lng: 2.3522, name: 'France', color: '#4DB8FF', size: 0.6 },
  { lat: -33.8688, lng: 151.2093, name: 'Sydney', color: '#4DFF88', size: 0.5 },
];

export const ThreeGlobe: React.FC = () => {
  const globeRef = useRef<GlobeMethods>();
  const [countries, setCountries] = useState<any>(null);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then(res => res.json())
      .then(setCountries);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
        // Soft camera movement
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.5;
        globeRef.current.pointOfView({ altitude: 2.5 });
    }
  }, []);

  // Custom 3D Pin Object (Clay-like)
  const getPinObject = useMemo(() => {
    return (pin: any) => {
        const group = new THREE.Group();
        
        // Pin head (sphere)
        const headGeom = new THREE.SphereGeometry(6, 12, 12);
        const headMat = new THREE.MeshStandardMaterial({ 
            color: pin.color, 
            roughness: 0.8,
            metalness: 0.1
        });
        const head = new THREE.Mesh(headGeom, headMat);
        head.position.y = 10;
        group.add(head);

        // Pin stick (cylinder)
        const stickGeom = new THREE.CylinderGeometry(1, 1, 10, 8);
        const stickMat = new THREE.MeshStandardMaterial({ 
            color: '#ffffff', 
            roughness: 0.9 
        });
        const stick = new THREE.Mesh(stickGeom, stickMat);
        stick.position.y = 5;
        group.add(stick);

        return group;
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" style={{ minHeight: '600px' }}>
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#D8B4FE"
        atmosphereAltitude={0.2}
        
        // Globe Materials (Clay Look)
        globeMaterial={new THREE.MeshStandardMaterial({
            color: '#A78BFA', // Soft purple water
            roughness: 0.9,
            metalness: 0.1
        })}
        
        // Landmasses (GeoJSON)
        polygonsData={countries ? countries.features : []}
        polygonCapColor={() => '#4ADE80'} // Green land
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        polygonStrokeColor={() => '#34D399'}
        polygonAltitude={0.01}

        // Geo-Pins
        customLayerData={PINS}
        customThreeObject={getPinObject}
        customThreeObjectUpdate={(obj, pin: any) => {
            Object.assign(obj.position, globeRef.current?.getCoords(pin.lat, pin.lng, 0.02));
            // Orient pins to point outwards from center
            const vector = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z).normalize();
            obj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vector);
        }}
        
        // Interactivity
        onCustomLayerHover={() => {
            // Optional: show tooltip
        }}
      />
      
      {/* Overlay Title */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight" style={{ fontFamily: "'Varela Round', sans-serif" }}>
          Global Pulse
        </h1>
        <p className="text-sm text-gray-500 font-medium">Real-time reflections from around the world</p>
      </div>

      {/* Floating Legend */}
      <div className="absolute bottom-10 right-10 z-20 p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5E5E]" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Active Communities</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Connected Worlds</span>
        </div>
      </div>
    </div>
  );
};

export default ThreeGlobe;
