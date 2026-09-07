/**
 * Core Application Domain Models & Types
 */

export type LayerId = 'esri-satellite' | 'osm-standard' | 'opentopo';

export type AppTheme = 'dark' | 'light';

export type Language = 'es' | 'en';

export interface TileLayerConfig {
  id: LayerId;
  name: string;
  category: string;
  url: string;
  attribution: string;
  maxZoom: number;
  subdomains?: string[];
  thumbnail: string;
  description: string;
  freeTierNote: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapCoordinatesHUD {
  lat: number;
  lng: number;
  zoom: number;
}
