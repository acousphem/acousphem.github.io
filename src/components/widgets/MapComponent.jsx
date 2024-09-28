import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configura la ruta de los íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LeafletMap = ({ lat, lon, zoom, markers }) => {
  useEffect(() => {
    // Solo ejecuta este código en el cliente
    if (typeof window !== 'undefined') {
      const map = L.map('map', { minZoom: 1 }).setView([lat, lon], zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      markers.forEach((marker) => {
        L.marker([marker.lat, marker.lon]).addTo(map).bindPopup(marker.popupText || '');
      });

      // Limpiar el mapa cuando el componente se desmonte
      return () => {
        map.remove();
      };
    }
  }, [lat, lon, zoom, markers]);

  return <div id="map" className="mb-10 mx-auto w-full md:w-3/4 lg:w-1/2 h-96"></div>;
};

export default LeafletMap;