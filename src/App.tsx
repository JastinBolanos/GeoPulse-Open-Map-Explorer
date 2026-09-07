import { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import { MapComponent } from './components/MapComponent';
import { MapHeader } from './components/MapHeader';
import { HighDensitySidebar } from './components/HighDensitySidebar';
import { MapControls } from './components/MapControls';
import { TelemetryHUD } from './components/TelemetryHUD';
import { TechInfoModal } from './components/TechInfoModal';
import { TILE_LAYERS } from './constants/layers.constants';
import { LayerId, MapCoordinatesHUD } from './types';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { useFullscreen } from './hooks/useFullscreen';
import { searchLocationByQuery } from './services/geocoding.service';

export default function App() {
  // Application State Hooks
  const { theme, isLight, setTheme } = useTheme('dark');
  const { language, translations, setLanguage } = useLanguage('es');
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // Map & Navigation State
  const [currentLayer, setCurrentLayer] = useState<LayerId>('esri-satellite');
  const [coordsHUD, setCoordsHUD] = useState<MapCoordinatesHUD>({ lat: 40.4168, lng: -3.7038, zoom: 6 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  const mapInstanceRef = useRef<L.Map | null>(null);

  // Responsive sidebar: auto-collapse on mobile viewports on initial load
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Recalculate map dimensions on layout / sidebar transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [isSidebarOpen]);

  // Geocoding Search handler via Nominatim service
  const handleSearchLocation = useCallback(async (query: string): Promise<boolean> => {
    try {
      const result = await searchLocationByQuery(query, language);

      if (result && mapInstanceRef.current) {
        const { lat, lng, displayName } = result;

        mapInstanceRef.current.flyTo([lat, lng], 12, { duration: 1.5 });

        // Highlight marker on searched location
        const marker = L.circleMarker([lat, lng], {
          radius: 12,
          color: '#3B82F6',
          fillColor: '#1D4ED8',
          fillOpacity: 0.7,
          weight: 2,
        }).addTo(mapInstanceRef.current);

        marker.bindPopup(`
          <div class="p-2 text-xs font-mono font-semibold ${isLight ? 'text-slate-900' : 'text-white'}">
            📍 ${displayName}
          </div>
        `).openPopup();

        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.removeLayer(marker);
          }
        }, 8000);

        return true;
      }

      const notFoundMessage = language === 'es'
        ? `No se encontró el lugar "${query}". Intenta con otra ciudad o coordenadas.`
        : `Location "${query}" was not found. Try another city or coordinates.`;
      alert(notFoundMessage);
      return false;
    } catch {
      const errorMessage = language === 'es'
        ? 'Error consultando el servicio de búsqueda abierta Nominatim.'
        : 'Error querying Nominatim open search service.';
      alert(errorMessage);
      return false;
    }
  }, [isLight, language]);

  // Map Controls Navigation Handlers
  const handleZoomIn = useCallback(() => {
    mapInstanceRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    mapInstanceRef.current?.zoomOut();
  }, []);

  const handleResetView = useCallback(() => {
    mapInstanceRef.current?.flyTo([40.2, -3.7], 6, { duration: 1 });
  }, []);

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) {
      alert(language === 'es' ? 'Tu navegador no soporta geolocalización.' : 'Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 14, { duration: 1.5 });

          const gpsIcon = L.divIcon({
            className: 'custom-leaflet-icon',
            html: `
              <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                <div class="w-8 h-8 rounded-full bg-blue-500/30 animate-ping absolute"></div>
                <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
                  <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
              </div>
            `,
          });

          const popupLabel = language === 'es' ? '📍 Tu posición actual (GPS)' : '📍 Your current location (GPS)';
          L.marker([latitude, longitude], { icon: gpsIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`<div class="p-2 text-xs font-mono font-bold text-white">${popupLabel}</div>`)
            .openPopup();
        }
      },
      () => {
        alert(language === 'es' ? 'No se pudo acceder a tu ubicación GPS.' : 'Could not access GPS location.');
      },
      { timeout: 10000 }
    );
  }, [language]);

  // Scale estimation calculation
  const currentScaleRatio = Math.round(591657550 / (2 ** coordsHUD.zoom));
  const formattedScale = `1 : ${currentScaleRatio.toLocaleString(language === 'es' ? 'es-ES' : 'en-US')}`;
  const currentLayerName = TILE_LAYERS.find((layer) => layer.id === currentLayer)?.name || 'Esri Satellite';

  return (
    <div
      id="app-root"
      className={`flex flex-col h-screen w-screen font-sans overflow-hidden select-none transition-colors duration-200 ${
        isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#0A0C10] text-[#E0E0E0]'
      }`}
    >
      {/* 1. Top Navigation Bar */}
      <MapHeader
        currentLayer={currentLayer}
        coordsHUD={coordsHUD}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onSearchLocation={handleSearchLocation}
        onOpenTechModal={() => setIsTechModalOpen(true)}
        appTheme={theme}
        language={language}
      />

      {/* 2. Primary Geographic Workspace */}
      <main className="flex flex-1 overflow-hidden relative">
        {/* Collapsible Layer & Settings Sidebar */}
        {isSidebarOpen && (
          <HighDensitySidebar
            currentLayer={currentLayer}
            onSelectLayer={setCurrentLayer}
            appTheme={theme}
            onToggleTheme={setTheme}
            language={language}
            onSelectLanguage={setLanguage}
          />
        )}

        {/* Primary Interactive Leaflet Canvas */}
        <section
          id="map-viewport"
          className={`flex-1 relative h-full overflow-hidden ${
            isLight ? 'bg-slate-200' : 'bg-[#010409]'
          }`}
        >
          <MapComponent
            currentLayer={currentLayer}
            showSatelliteLabels={true}
            onUpdateCoords={setCoordsHUD}
            mapInstanceRef={mapInstanceRef}
          />

          {/* Floating Navigation Controls */}
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onGeolocate={handleGeolocate}
            onResetView={handleResetView}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            appTheme={theme}
            language={language}
          />

          {/* Floating Telemetry HUD Capsule */}
          <TelemetryHUD
            formattedScale={formattedScale}
            currentLayerName={currentLayerName}
            isLight={isLight}
            language={language}
          />
        </section>
      </main>

      {/* 3. Technical Architecture Specifications Modal */}
      <TechInfoModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
        appTheme={theme}
        language={language}
      />
    </div>
  );
}
