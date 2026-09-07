import React from 'react';
import { Plus, Minus, Crosshair, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { AppTheme, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onGeolocate: () => void;
  onResetView: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  appTheme: AppTheme;
  language: Language;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onGeolocate,
  onResetView,
  isFullscreen,
  onToggleFullscreen,
  appTheme,
  language,
}) => {
  const t = getTranslation(language);
  const isLight = appTheme === 'light';

  const btnBaseClass = isLight
    ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-md'
    : 'bg-[#161B22] border border-[#30363D] text-slate-300 hover:bg-[#21262d] hover:text-white shadow-xl';

  return (
    <div className="absolute bottom-5 right-4 sm:right-6 z-30 flex flex-col gap-2 select-none">
      {/* Fullscreen Toggle */}
      <button
        id="fullscreen-toggle-btn"
        onClick={onToggleFullscreen}
        className={`w-8 h-8 flex items-center justify-center rounded transition ${btnBaseClass}`}
        title={isFullscreen ? t.fullscreenExit : t.fullscreenEnter}
      >
        {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
      </button>

      {/* Recenter Map View */}
      <button
        id="recenter-map-btn"
        onClick={onResetView}
        className={`w-8 h-8 flex items-center justify-center rounded transition ${btnBaseClass} hover:text-blue-500`}
        title={t.recenter}
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      {/* GPS Locate Me */}
      <button
        id="geolocate-btn"
        onClick={onGeolocate}
        className={`w-8 h-8 flex items-center justify-center rounded transition ${btnBaseClass} hover:text-emerald-500`}
        title={t.geolocate}
      >
        <Crosshair className="w-4 h-4" />
      </button>

      {/* Zoom In / Out High Density Module */}
      <div className={`p-1 rounded flex flex-col ${
        isLight
          ? 'bg-white border border-slate-200 shadow-md'
          : 'bg-[#161B22] border border-[#30363D] shadow-xl'
      }`}>
        <button
          id="zoom-in-btn"
          onClick={onZoomIn}
          className={`w-8 h-8 flex items-center justify-center rounded transition font-mono font-bold text-sm ${
            isLight
              ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              : 'text-slate-300 hover:bg-[#21262d] hover:text-white'
          }`}
          title={t.zoomIn}
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className={`h-[1px] w-6 mx-auto my-0.5 ${isLight ? 'bg-slate-200' : 'bg-[#30363D]'}`}></div>
        <button
          id="zoom-out-btn"
          onClick={onZoomOut}
          className={`w-8 h-8 flex items-center justify-center rounded transition font-mono font-bold text-sm ${
            isLight
              ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              : 'text-slate-300 hover:bg-[#21262d] hover:text-white'
          }`}
          title={t.zoomOut}
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
