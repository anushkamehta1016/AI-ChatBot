
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TravelMapProps {
  destination?: string;
}

const TravelMap = ({ destination }: TravelMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937], // Default center on India
      zoom: 3
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current || !destination) return;

    // Remove previous markers
    const markers = document.getElementsByClassName('mapboxgl-marker');
    while(markers[0]) {
      markers[0].remove();
    }

    // Geocode the destination
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destination)}.json?access_token=${mapboxToken}`)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features[0]) {
          const [lng, lat] = data.features[0].center;
          
          // Add marker
          const marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current!);

          // Fly to location
          map.current?.flyTo({
            center: [lng, lat],
            zoom: 9,
            essential: true
          });
        }
      })
      .catch(error => console.error('Error geocoding destination:', error));
  }, [destination, mapboxToken]);

  if (showTokenInput) {
    return (
      <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/60 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Map Setup Required</h3>
          </div>
          <p className="text-sm text-gray-300">
            Please enter your Mapbox public token to enable the map feature.
            You can get one for free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">mapbox.com</a>
          </p>
          <input
            type="text"
            placeholder="Enter your Mapbox token"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button 
            onClick={() => setShowTokenInput(false)}
            disabled={!mapboxToken}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Set Token
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-800">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default TravelMap;
