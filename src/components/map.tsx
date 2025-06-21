'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


export interface Report {
  id: number;
  imagePreview: string;
  location: { lat: number; lng: number };
  timestamp: string;
}

interface MapProps {
  reports: Report[];
  center: [number, number];
}

// Component to programmatically update the map's view
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}


export default function Map({ reports, center }: MapProps) {
  const zoom = 13;
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-lg z-0">
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {reports.map((report) => (
        <Marker key={report.id} position={[report.location.lat, report.location.lng]}>
          <Popup>
            <div className="space-y-2">
              <div className="relative h-32 w-40">
                <img src={report.imagePreview} alt="Reported waste" className="object-cover rounded-md w-full h-full" />
              </div>
              <p className="text-xs text-muted-foreground">Reported on: {report.timestamp}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
