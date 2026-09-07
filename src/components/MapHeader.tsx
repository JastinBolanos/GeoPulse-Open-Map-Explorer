import React, { useState, useEffect } from 'react';
import { Search, Info, Loader2, PanelLeftClose, PanelLeft, Navigation2 } from 'lucide-react';
import { motion } from 'motion/react';
import { LayerId, AppTheme, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface MapHeaderProps {
  currentLayer: LayerId;
  coordsHUD: { lat: number; lng: number; zoom: number };
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onSearchLocation: (query: string) => Promise<boolean>;
  onOpenTechModal: () => void;
  appTheme: AppTheme;
  language: Language;
}

export const MapHeader: React.FC<MapHeaderProps> = ({
  coordsHUD,
  isSidebarOpen,
  onToggleSidebar,
  onSearchLocation,
  onOpenTechModal,
  appTheme,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const t = getTranslation(language);
  const isLight = appTheme === 'light';

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;
    setIsSearching(true);
    try {
      await onSearchLocation(searchQuery);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className={`flex items-center justify-between px-4 sm:px-6 h-14 border-b shrink-0 select-none z-40 relative transition-colors duration-200 ${
      isLight 
        ? 'bg-white border-slate-200 text-slate-800' 
        : 'bg-[#161B22] border-[#2D333B] text-[#E0E0E0]'
    }`}>
      {/* Left Cluster: Sidebar Toggle & Branding */}
      <div className="flex items-center gap-3">
        <button
          id="toggle-sidebar-btn"
          onClick={onToggleSidebar}
          className={`p-1.5 rounded transition border ${
            isLight
              ? 'hover:bg-slate-100 text-slate-600 border-slate-200'
              : 'hover:bg-[#21262d] text-slate-400 hover:text-white border-[#30363D]'
          }`}
          title={isSidebarOpen ? t.toggleSidebarHide : t.toggleSidebarShow}
        >
          {isSidebarOpen ? <PanelLeftClose className="w-4 h-4 text-blue-500" /> : <PanelLeft className="w-4 h-4 text-slate-400" />}
        </button>

        <div className="flex items-center gap-2.5">
          {/* Animated Living Logo */}
          <motion.div
            id="brand-logo-container"
            className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center shadow-md shadow-blue-900/40 cursor-pointer"
            animate={{
              x: [0, -1.2, 1.4, -0.8, 1, -0.4, 0],
              y: [0, -2, 0, 1.6, -0.5, 0],
              rotate: [0, -2.5, 3, -1.5, 1, 0],
              scale: [1, 1.04, 0.98, 1.03, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
            }}
            whileHover={{
              scale: 1.15,
              rotate: [0, -6, 6, -3, 0],
              transition: { duration: 0.4 },
            }}
          >
            {/* Subtle energetic pulse aura */}
            <motion.span
              className="absolute inset-0 rounded bg-blue-400/25 pointer-events-none"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Micro-tilting compass arrow */}
            <motion.div
              animate={{
                rotate: [0, 9, -7, 4, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Navigation2 className="w-4 h-4 text-white fill-white relative z-10" />
            </motion.div>
          </motion.div>

          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-tight uppercase flex items-center gap-1.5 leading-none">
              GeoPulse
            </h1>
            <p className={`text-[10px] font-mono leading-none mt-0.5 hidden sm:block ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {t.engineSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Integrated High Density Search Box */}
      <div className="hidden md:flex items-center">
        <form onSubmit={handleSearch} className="relative">
          <div className={`flex items-center border rounded overflow-hidden shadow-inner w-64 lg:w-80 transition-colors ${
            isLight
              ? 'bg-slate-50 border-slate-300 text-slate-900'
              : 'bg-[#0D1117] border-[#30363D] text-[#E0E0E0]'
          }`}>
            <div className={`pl-3 py-1.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              id="header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`bg-transparent border-none text-xs p-1.5 focus:outline-none w-full font-mono ${
                isLight 
                  ? 'text-slate-900 placeholder-slate-400' 
                  : 'text-[#E0E0E0] placeholder-slate-600'
              }`}
            />
            {isSearching ? (
              <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin mr-2" />
            ) : (
              searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`mr-2 text-xs ${isLight ? 'text-slate-400 hover:text-slate-700' : 'text-slate-500 hover:text-white'}`}
                >
                  &times;
                </button>
              )
            )}
          </div>
        </form>
      </div>

      {/* Right Cluster: Telemetry Status, Coordinates HUD, UTC Clock, Info */}
      <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
        {/* System Active Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className={`tracking-wider text-[11px] font-semibold hidden sm:inline ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            {t.systemActive}
          </span>
        </div>

        {/* Live Coordinate readout */}
        <div className={`hidden xl:block text-[11px] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
          LAT: <span className={isLight ? 'text-slate-700 font-semibold' : 'text-slate-300'}>{coordsHUD.lat.toFixed(4)}</span> | LONG: <span className={isLight ? 'text-slate-700 font-semibold' : 'text-slate-300'}>{coordsHUD.lng.toFixed(4)}</span>
        </div>

        {/* Architecture & Tech explanation button */}
        <button
          id="tech-info-header-btn"
          onClick={onOpenTechModal}
          className={`p-1.5 rounded border transition flex items-center gap-1.5 ${
            isLight
              ? 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
              : 'bg-[#161B22] border-[#30363D] hover:bg-[#21262d] text-slate-300 hover:text-white'
          }`}
          title={t.techTooltip}
        >
          <Info className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-[11px] hidden lg:inline">{t.techButton}</span>
        </button>
      </div>
    </header>
  );
};
