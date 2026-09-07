import { Language } from '../types';

export const TRANSLATIONS = {
  es: {
    // Header
    systemActive: 'SISTEMA ACTIVO',
    engineSubtitle: 'MOTOR DE ALTA DENSIDAD LEAFLET',
    searchPlaceholder: 'Buscar coordenadas o ciudad...',
    searchTooltip: 'Buscar ubicación',
    techButton: 'Tecnología',
    techTooltip: 'Ver especificaciones técnicas y capas libres',
    toggleSidebarHide: 'Ocultar consola lateral',
    toggleSidebarShow: 'Mostrar consola lateral',

    // Sidebar
    mapLayersTitle: 'CAPAS DE MAPA (XYZ LIBRE)',
    noApiKeyBadge: 'SIN API KEY',
    layerSatellite: 'Satelital HD (Esri)',
    layerOsm: 'Carreteras (OpenStreetMap)',
    layerTopo: 'Relieve (OpenTopoMap)',

    // Appearance & Language in Sidebar
    appearanceTitle: 'APARIENCIA DE LA APP',
    themeDark: 'Modo Oscuro',
    themeLight: 'Modo Claro',
    languageTitle: 'IDIOMA / LANGUAGE',
    langEs: 'Español',
    langEn: 'English',

    // Telemetry Footer
    networkLatency: 'Latencia de red',
    tileServer: 'SERVIDOR DE TESELAS',
    tileServerStatus: 'EN LÍNEA / 200 OK',

    // Controls
    zoomIn: 'Acercar zoom (+)',
    zoomOut: 'Alejar zoom (−)',
    recenter: 'Restablecer vista centrada',
    geolocate: 'Mi posición actual (GPS)',
    fullscreenEnter: 'Pantalla completa',
    fullscreenExit: 'Salir de pantalla completa',

    // Bottom HUD
    satelliteMode: 'Modo Satelital',
    globalGrid: 'Malla Global',
    freePublicService: 'Servicio Público Gratuito',
    gisActive: 'GIS Activo',

    // Tech Modal
    techModalTitle: 'Especificaciones Técnicas & Arquitectura XYZ',
    techModalSubtitle: 'Leaflet.js + Capas Raster Públicas sin API Key ni tarjeta',
    openSourceBadge: 'CÓDIGO ABIERTO',
    techQuestionTitle: '¿CÓMO SE LLAMA Y QUÉ TECNOLOGÍAS UTILIZA?',
    techAnswerText:
      'La biblioteca cartográfica principal es Leaflet.js (integrada directamente en React con TypeScript). Consume teselas raster estándar {z}/{y}/{x} de servidores públicos y abiertos (Esri ArcGIS, OpenStreetMap y OpenTopoMap). No genera facturación por consumo, no requiere registro previo ni llaves propietarias de Google Maps.',
    packagesTitle: 'Paquetes NPM & Estilos',
    tileUrlsTitle: 'URLs de Teselas (Públicas y Gratuitas)',
    copyUrl: 'Copiar URL',
    copiedUrl: 'Copiado',
    closeModal: 'Cerrar [ESC]',
  },
  en: {
    // Header
    systemActive: 'SYSTEM ACTIVE',
    engineSubtitle: 'LEAFLET HIGH-DENSITY ENGINE',
    searchPlaceholder: 'Search coordinates or city...',
    searchTooltip: 'Search location',
    techButton: 'Tech Specs',
    techTooltip: 'View technical specs and free layers',
    toggleSidebarHide: 'Hide sidebar console',
    toggleSidebarShow: 'Show sidebar console',

    // Sidebar
    mapLayersTitle: 'MAP LAYERS (FREE XYZ)',
    noApiKeyBadge: 'NO API KEY',
    layerSatellite: 'HD Satellite (Esri)',
    layerOsm: 'Roads (OpenStreetMap)',
    layerTopo: 'Topography (OpenTopoMap)',

    // Appearance & Language in Sidebar
    appearanceTitle: 'APP APPEARANCE',
    themeDark: 'Dark Mode',
    themeLight: 'Light Mode',
    languageTitle: 'LANGUAGE / IDIOMA',
    langEs: 'Español',
    langEn: 'English',

    // Telemetry Footer
    networkLatency: 'Network Latency',
    tileServer: 'TILE SERVER',
    tileServerStatus: 'ONLINE / 200 OK',

    // Controls
    zoomIn: 'Zoom in (+)',
    zoomOut: 'Zoom out (−)',
    recenter: 'Reset centered view',
    geolocate: 'My current location (GPS)',
    fullscreenEnter: 'Fullscreen',
    fullscreenExit: 'Exit fullscreen',

    // Bottom HUD
    satelliteMode: 'Satellite Mode',
    globalGrid: 'Global Grid',
    freePublicService: 'Free Public Service',
    gisActive: 'GIS Active',

    // Tech Modal
    techModalTitle: 'Tech Specs & XYZ Tile Architecture',
    techModalSubtitle: 'Leaflet.js + Public Raster Tiles without API Key or Credit Card',
    openSourceBadge: 'OPEN SOURCE',
    techQuestionTitle: 'WHAT IS IT CALLED & WHAT TECH DOES IT USE?',
    techAnswerText:
      'The core mapping library is Leaflet.js (integrated directly into React with TypeScript). It consumes standard {z}/{y}/{x} raster tiles from open and public servers (Esri ArcGIS, OpenStreetMap, and OpenTopoMap). It does not bill per request, requires no prior registration, and needs no proprietary Google Maps API keys.',
    packagesTitle: 'NPM Packages & Stylesheets',
    tileUrlsTitle: 'Tile Layer URLs (Free & Public)',
    copyUrl: 'Copy URL',
    copiedUrl: 'Copied',
    closeModal: 'Close [ESC]',
  },
};

export const getTranslation = (lang: Language) => TRANSLATIONS[lang] || TRANSLATIONS.es;
