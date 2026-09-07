import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { LayerId } from '../types';
import { TILE_LAYERS, SATELLITE_LABELS_LAYER } from '../constants/layers.constants';

interface MapComponentProps {
  currentLayer: LayerId;
  showSatelliteLabels?: boolean;
  onUpdateCoords: (coords: { lat: number; lng: number; zoom: number }) => void;
  mapInstanceRef: React.MutableRefObject<L.Map | null>;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  currentLayer,
  showSatelliteLabels = true,
  onUpdateCoords,
  mapInstanceRef,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const activeTileLayerRef = useRef<L.TileLayer | null>(null);
  const activeLabelsLayerRef = useRef<L.TileLayer | null>(null);

  // 1. Initialize Leaflet Map on mount
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initial center on Spain (Iberian Peninsula)
    const map = L.map(mapContainerRef.current, {
      center: [40.2, -3.7],
      zoom: 6,
      zoomControl: false, // We use custom floating zoom controls
      attributionControl: true,
      maxBoundsViscosity: 0.8,
    });

    mapInstanceRef.current = map;

    // Track mouse coordinates for HUD
    map.on('mousemove', (e) => {
      onUpdateCoords({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        zoom: map.getZoom(),
      });
    });

    map.on('zoomend', () => {
      const center = map.getCenter();
      onUpdateCoords({
        lat: center.lat,
        lng: center.lng,
        zoom: map.getZoom(),
      });
    });

    // Cleanup on unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Handle Base Tile Layer & Satellite Labels changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const layerConfig = TILE_LAYERS.find((l) => l.id === currentLayer) || TILE_LAYERS[0];

    // Remove previous base tile layer
    if (activeTileLayerRef.current) {
      map.removeLayer(activeTileLayerRef.current);
    }

    // Add new base tile layer
    const newTileLayer = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      maxZoom: layerConfig.maxZoom,
      subdomains: layerConfig.subdomains || 'abc',
    });

    newTileLayer.addTo(map);
    activeTileLayerRef.current = newTileLayer;

    // Handle satellite places / boundaries labels overlay
    if (activeLabelsLayerRef.current) {
      map.removeLayer(activeLabelsLayerRef.current);
      activeLabelsLayerRef.current = null;
    }

    if (currentLayer === 'esri-satellite' && showSatelliteLabels) {
      const labelsLayer = L.tileLayer(
        SATELLITE_LABELS_LAYER.url,
        {
          attribution: SATELLITE_LABELS_LAYER.attribution,
          maxZoom: SATELLITE_LABELS_LAYER.maxZoom,
        }
      );
      labelsLayer.addTo(map);
      activeLabelsLayerRef.current = labelsLayer;
    }
  }, [currentLayer, showSatelliteLabels]);

  return (
    <div 
      id="leaflet-map-canvas" 
      ref={mapContainerRef} 
      className="w-full h-full min-h-screen relative select-none"
    />
  );
};
