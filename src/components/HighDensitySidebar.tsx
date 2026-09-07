import React from 'react';
import { 
  Check, 
  Sun, 
  Moon, 
  Languages
} from 'lucide-react';
import { LayerId, AppTheme, Language } from '../types';
import { TILE_LAYERS } from '../constants/layers.constants';
import { getTranslation } from '../utils/translations';

interface HighDensitySidebarProps {
  currentLayer: LayerId;
  onSelectLayer: (layerId: LayerId) => void;
  appTheme: AppTheme;
  onToggleTheme: (theme: AppTheme) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const HighDensitySidebar: React.FC<HighDensitySidebarProps> = ({
  currentLayer,
  onSelectLayer,
  appTheme,
  onToggleTheme,
  language,
  onSelectLanguage,
}) => {
  const t = getTranslation(language);
  const isLight = appTheme === 'light';

  // Localized layer names
  const getLocalizedLayerName = (id: LayerId, defaultName: string) => {
    switch (id) {
      case 'esri-satellite':
        return t.layerSatellite;
      case 'osm-standard':
        return t.layerOsm;
      case 'opentopo':
        return t.layerTopo;
      default:
        return defaultName;
    }
  };

  return (
    <aside 
      id="high-density-sidebar"
      className={`w-72 sm:w-80 border-r flex flex-col h-full shrink-0 select-none overflow-hidden z-30 transition-colors duration-200 ${
        isLight 
          ? 'bg-white border-slate-200 text-slate-900' 
          : 'bg-[#0D1117] border-[#2D333B] text-[#E0E0E0]'
      }`}
    >
      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        {/* Section 1: Map Layers */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className={`text-[10px] uppercase tracking-widest font-mono font-semibold ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}>
              {t.mapLayersTitle}
            </h2>
            <span className={`text-[9px] font-mono px-1 rounded border ${
              isLight 
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
            }`}>
              {t.noApiKeyBadge}
            </span>
          </div>

          <div className="space-y-1.5">
            {TILE_LAYERS.map((layer) => {
              const isSelected = currentLayer === layer.id;
              const displayName = getLocalizedLayerName(layer.id, layer.name);

              return (
                <button
                  key={layer.id}
                  id={`select-layer-${layer.id}-btn`}
                  onClick={() => onSelectLayer(layer.id)}
                  className={`w-full flex items-center justify-between p-2 rounded transition-all text-left ${
                    isSelected
                      ? isLight
                        ? 'bg-blue-50 border border-blue-500 text-blue-700 font-semibold shadow-xs'
                        : 'bg-blue-600/10 border border-blue-500/50 text-blue-400 font-medium'
                      : isLight
                        ? 'hover:bg-slate-100 border border-transparent text-slate-600'
                        : 'hover:bg-[#21262d] border border-transparent text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? isLight
                            ? 'border-4 border-blue-600 bg-transparent'
                            : 'border-4 border-blue-500 bg-transparent'
                          : isLight
                            ? 'border-2 border-slate-400'
                            : 'border-2 border-slate-600'
                      }`}
                    />
                    <span className="text-xs font-medium truncate max-w-[190px]">
                      {displayName}
                    </span>
                  </div>
                  {isSelected && (
                    <Check className={`w-3.5 h-3.5 shrink-0 ${
                      isLight ? 'text-blue-600' : 'text-blue-400'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: App Appearance (Modo Claro / Modo Oscuro) */}
        <div className={`pt-4 border-t ${isLight ? 'border-slate-200' : 'border-[#21262d]'}`}>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className={`text-[10px] uppercase tracking-widest font-mono font-semibold ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}>
              {t.appearanceTitle}
            </h3>
            <span className={`text-[9px] font-mono font-bold ${
              isLight ? 'text-amber-600' : 'text-blue-400'
            }`}>
              {appTheme === 'dark' ? 'DARK UI' : 'LIGHT UI'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
            {/* Dark Mode Button */}
            <button
              id="theme-dark-btn"
              onClick={() => onToggleTheme('dark')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded border transition-all ${
                appTheme === 'dark'
                  ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-sm shadow-blue-900/40'
                  : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-[#161B22] hover:bg-[#21262d] text-slate-400 hover:text-white border-[#30363D]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 shrink-0" />
              <span>{t.themeDark}</span>
            </button>

            {/* Light Mode Button */}
            <button
              id="theme-light-btn"
              onClick={() => onToggleTheme('light')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded border transition-all ${
                appTheme === 'light'
                  ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm'
                  : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-[#161B22] hover:bg-[#21262d] text-slate-400 hover:text-white border-[#30363D]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 shrink-0" />
              <span>{t.themeLight}</span>
            </button>
          </div>
        </div>

        {/* Section 3: Language Selector (Inglés / Español) */}
        <div className={`pt-4 border-t ${isLight ? 'border-slate-200' : 'border-[#21262d]'}`}>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className={`text-[10px] uppercase tracking-widest font-mono font-semibold flex items-center gap-1.5 ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}>
              <Languages className="w-3 h-3 text-blue-500" />
              <span>{t.languageTitle}</span>
            </h3>
            <span className={`text-[9px] font-mono font-bold ${
              language === 'es' ? 'text-emerald-500' : 'text-blue-400'
            }`}>
              {language.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
            {/* Spanish Button */}
            <button
              id="lang-es-btn"
              onClick={() => onSelectLanguage('es')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded border transition-all ${
                language === 'es'
                  ? isLight
                    ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                    : 'bg-blue-600 text-white font-bold border-blue-500 shadow-sm shadow-blue-900/40'
                  : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-[#161B22] hover:bg-[#21262d] text-slate-400 hover:text-white border-[#30363D]'
              }`}
            >
              <span className="font-bold text-[10px] px-1 py-0.5 rounded bg-black/20">ES</span>
              <span>{t.langEs}</span>
            </button>

            {/* English Button */}
            <button
              id="lang-en-btn"
              onClick={() => onSelectLanguage('en')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded border transition-all ${
                language === 'en'
                  ? isLight
                    ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                    : 'bg-blue-600 text-white font-bold border-blue-500 shadow-sm shadow-blue-900/40'
                  : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-[#161B22] hover:bg-[#21262d] text-slate-400 hover:text-white border-[#30363D]'
              }`}
            >
              <span className="font-bold text-[10px] px-1 py-0.5 rounded bg-black/20">EN</span>
              <span>{t.langEn}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
