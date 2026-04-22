"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

interface RouteMapProps {
  className?: string;
}


function RouteMap({ className = "h-[300px] md:h-[400px]" }: RouteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  // Tigoi Primary School coordinates - centered on the track loop
  const center: [number, number] = [0.0444, 34.7272];

  // Real road coordinates from OSRM routing (simplified for ~5km route)
  // OSRM returns [lon, lat], but Leaflet expects [lat, lon]
  const routeCoordsOSRM: [number, number][] = [
    [34.7198, 0.0396],
    [34.7197, 0.0401],
    [34.7197, 0.0403],
    [34.7198, 0.0407],
    [34.7199, 0.0410],
    [34.7197, 0.0415],
    [34.7196, 0.0417],
    [34.7195, 0.0418],
    [34.7195, 0.0419],
    [34.7195, 0.0421],
    [34.7193, 0.0425],
    [34.7191, 0.0428],
    [34.7191, 0.0429],
    [34.7190, 0.0431],
    [34.7191, 0.0432],
    [34.7188, 0.0438],
    [34.7187, 0.0439],
    [34.7191, 0.0444],
    [34.7196, 0.0450],
    [34.7197, 0.0452],
    [34.7201, 0.0456],
    [34.7203, 0.0458],
    [34.7207, 0.0463],
    [34.7209, 0.0465],
    [34.7211, 0.0468],
    [34.7214, 0.0471],
    [34.7216, 0.0474],
    [34.7219, 0.0477],
    [34.7222, 0.0480],
    [34.7225, 0.0483],
    [34.7230, 0.0487],
    [34.7231, 0.0488],
    [34.7232, 0.0490],
    [34.7233, 0.0491],
    [34.7234, 0.0491],
    [34.7238, 0.0491],
    [34.7248, 0.0491],
    [34.7251, 0.0492],
    [34.7254, 0.0492],
    [34.7260, 0.0492],
    [34.7262, 0.0492],
    [34.7264, 0.0492],
    [34.7268, 0.0492],
    [34.7275, 0.0492],
    [34.7279, 0.0492],
    [34.7286, 0.0492],
    [34.7293, 0.0492],
    [34.7305, 0.0492],
    [34.7311, 0.0492],
    [34.7315, 0.0492],
    [34.7318, 0.0492],
    [34.7326, 0.0492],
    [34.7331, 0.0492],
    [34.7334, 0.0492],
    [34.7342, 0.0492],
    [34.7348, 0.0492],
    [34.7353, 0.0492],
    [34.7357, 0.0492],
    [34.7353, 0.0492],
    [34.7348, 0.0492],
    [34.7342, 0.0492],
    [34.7334, 0.0492],
    [34.7331, 0.0492],
    [34.7326, 0.0492],
    [34.7318, 0.0492],
    [34.7311, 0.0492],
    [34.7305, 0.0492],
    [34.7293, 0.0492],
    [34.7286, 0.0492],
    [34.7279, 0.0492],
    [34.7275, 0.0492],
    [34.7268, 0.0492],
    [34.7264, 0.0492],
    [34.7262, 0.0492],
    [34.7260, 0.0492],
    [34.7254, 0.0492],
    [34.7248, 0.0491],
    [34.7238, 0.0491],
    [34.7234, 0.0491],
    [34.7233, 0.0491],
    [34.7232, 0.0490],
    [34.7231, 0.0488],
    [34.7230, 0.0487],
    [34.7225, 0.0483],
    [34.7222, 0.0480],
    [34.7219, 0.0477],
    [34.7216, 0.0474],
    [34.7214, 0.0471],
    [34.7211, 0.0468],
    [34.7209, 0.0465],
    [34.7207, 0.0463],
    [34.7203, 0.0458],
    [34.7201, 0.0456],
    [34.7197, 0.0452],
    [34.7196, 0.0450],
    [34.7191, 0.0444],
    [34.7187, 0.0439],
    [34.7188, 0.0438],
    [34.7191, 0.0432],
    [34.7190, 0.0431],
    [34.7191, 0.0429],
    [34.7191, 0.0428],
    [34.7193, 0.0425],
    [34.7195, 0.0421],
    [34.7195, 0.0419],
    [34.7195, 0.0418],
    [34.7196, 0.0417],
    [34.7197, 0.0415],
    [34.7199, 0.0410],
    [34.7198, 0.0407],
    [34.7197, 0.0403],
    [34.7197, 0.0401],
    [34.7198, 0.0396],
  ];

  // Convert OSRM [lon, lat] to Leaflet [lat, lon]
  const routeCoords: [number, number][] = routeCoordsOSRM.map(([lon, lat]) => [lat, lon] as [number, number]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Prevent double initialization in Strict Mode / Fast Refresh
    if (mapInstance.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      const map = L.map(mapContainer.current!, {
        center: center,
        zoom: 14,
        zoomControl: true,
        dragging: true,
        scrollWheelZoom: true,
      });

      // Clean minimal tiles
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Draw track as animated dashed line (using real road coordinates)
      const trackLine = L.polyline(routeCoords, {
        color: "#DC2626",
        weight: 5,
        opacity: 1,
        dashArray: "16, 12",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Animated dashed line (slower)
      const style = document.createElement("style");
      style.textContent = `
        @keyframes dash-slow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -56; }
        }
        .leaflet-interactive.track-animated {
          animation: dash-slow 2s linear infinite;
        }
      `;
      document.head.appendChild(style);

      setTimeout(() => {
        const pathEl = trackLine.getElement();
        if (pathEl) {
          pathEl.classList.add("track-animated");
        }
      }, 200);

      // Start marker
      const startIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full border-3 border-white shadow-lg"><div class="w-3 h-3 bg-white rounded-full"></div></div>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      L.marker(routeCoords[0], { icon: startIcon }).addTo(map);

      // Finish marker
      const finishIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full border-3 border-white shadow-lg"><div class="w-3 h-3 bg-white rounded-full"></div></div>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      L.marker(routeCoords[routeCoords.length - 1], { icon: finishIcon }).addTo(map);

      // KM markers
      const kmLabels = [0, 2.5, 5];
      kmLabels.forEach((km) => {
        const idx = Math.floor((km / 5) * (routeCoords.length - 1));
        const pos = routeCoords[idx];
        if (pos) {
          const kmIcon = L.divIcon({
            html: `<div class="text-xs font-bold text-gray-700 bg-white px-2 py-1 rounded shadow border border-gray-200 whitespace-nowrap">${km}km</div>`,
            className: "",
            iconSize: [45, 24],
            iconAnchor: [22, 12],
          });
          L.marker(pos, { icon: kmIcon }).addTo(map);
        }
      });

      // Tigoi Primary School label
      const schoolIcon = L.divIcon({
        html: `<div class="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded shadow border border-blue-300 whitespace-nowrap">Tigoi Primary School</div>`,
        className: "",
        iconSize: [130, 24],
        iconAnchor: [65, 12],
      });
      L.marker([0.039, 34.7198], { icon: schoolIcon }).addTo(map);


      return () => {
        map.remove();
        mapInstance.current = null;
      };
    }

    initMap();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`w-full ${className} rounded-2xl overflow-hidden`}
    >
      <div ref={mapContainer} className="w-full h-full" />
    </motion.div>
  );
}

export default RouteMap;