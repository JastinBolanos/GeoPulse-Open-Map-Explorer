import { TileLayerConfig } from '../types';

/**
 * Public Free XYZ Raster Tile Layer Definitions
 * None of these endpoints require private commercial API keys or billing.
 */
export const TILE_LAYERS: TileLayerConfig[] = [
  {
    id: 'esri-satellite',
    name: 'Satelital HD (Esri)',
    category: 'Satellite Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19,
    thumbnail: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/4/5/7',
    description: 'High-resolution global satellite imagery publicly hosted by Esri / ArcGIS Online.',
    freeTierNote: '100% free with no API key or credit card required',
  },
  {
    id: 'osm-standard',
    name: 'Carreteras (OpenStreetMap)',
    category: 'Roads & Streets',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    subdomains: ['a', 'b', 'c'],
    thumbnail: 'https://a.tile.openstreetmap.org/4/7/5.png',
    description: 'The most comprehensive open collaborative street map on Earth.',
    freeTierNote: 'Open-source community project by OpenStreetMap Foundation',
  },
  {
    id: 'opentopo',
    name: 'Relieve (OpenTopoMap)',
    category: 'Topography & Contours',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 17,
    subdomains: ['a', 'b', 'c'],
    thumbnail: 'https://a.tile.opentopomap.org/4/7/5.png',
    description: 'Topographic contour shading with SRTM elevation data and OSM labels.',
    freeTierNote: 'Global open topography project',
  },
];

export const SATELLITE_LABELS_LAYER = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
  attribution: 'Labels &copy; Esri',
  maxZoom: 19,
};
