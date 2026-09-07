import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface TelemetryHUDProps {
  formattedScale: string;
  currentLayerName: string;
  isLight: boolean;
  language: Language;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  formattedScale,
  currentLayerName,
  isLight,
  language,
}) => {
  const t = getTranslation(language);

  return (
    <div
      id="telemetry-hud-capsule"
      className={`absolute bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-4 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl z-20 pointer-events-auto font-mono text-xs border transition-colors ${
        isLight
          ? 'bg-white/95 border-slate-200 text-slate-700 shadow-slate-300/50'
          : 'bg-[#161B22]/90 border-[#30363D] text-slate-300'
      }`}
    >
      <div
        className={`flex items-center gap-2 pr-3 border-r ${
          isLight ? 'border-slate-200' : 'border-[#2D333B]'
        }`}
      >
        <span
          className={`text-[10px] uppercase font-bold ${
            isLight ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {language === 'es' ? 'PROYECCIÓN' : 'PROJECTION'}
        </span>
        <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>
          EPSG:3857
        </span>
      </div>

      <div
        className={`flex items-center gap-2 pr-3 border-r ${
          isLight ? 'border-slate-200' : 'border-[#2D333B]'
        }`}
      >
        <span
          className={`text-[10px] uppercase font-bold ${
            isLight ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {language === 'es' ? 'ESCALA' : 'SCALE'}
        </span>
        <span className="text-blue-500 font-semibold">{formattedScale}</span>
      </div>

      <div
        className={`flex items-center gap-2 pr-3 border-r ${
          isLight ? 'border-slate-200' : 'border-[#2D333B]'
        }`}
      >
        <span
          className={`text-[10px] uppercase font-bold ${
            isLight ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {language === 'es' ? 'CAPA' : 'LAYER'}
        </span>
        <span
          className={`truncate max-w-[140px] font-medium ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}
        >
          {currentLayerName}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs text-emerald-500 font-bold">{t.gisActive}</span>
      </div>
    </div>
  );
};
