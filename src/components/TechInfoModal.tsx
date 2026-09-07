import React from 'react';
import { ShieldCheck, Layers, Globe, Code, X, Copy, Check } from 'lucide-react';
import { TILE_LAYERS } from '../constants/layers.constants';
import { AppTheme, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface TechInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  appTheme: AppTheme;
  language: Language;
}

export const TechInfoModal: React.FC<TechInfoModalProps> = ({ 
  isOpen, 
  onClose, 
  appTheme, 
  language 
}) => {
  const [copiedUrl, setCopiedUrl] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const t = getTranslation(language);
  const isLight = appTheme === 'light';

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="tech-info-modal"
        className={`relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-lg p-5 shadow-2xl font-sans border transition-colors ${
          isLight 
            ? 'bg-white border-slate-200 text-slate-800' 
            : 'bg-[#0D1117] border-[#30363D] text-[#E0E0E0]'
        }`}
      >
        {/* Header */}
        <div className={`flex items-start justify-between pb-3 border-b ${
          isLight ? 'border-slate-200' : 'border-[#2D333B]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-md">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className={`text-sm sm:text-base font-bold tracking-tight uppercase font-mono flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {t.techModalTitle}
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono border ${
                  isLight 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {t.openSourceBadge}
                </span>
              </h2>
              <p className={`text-xs font-mono mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {t.techModalSubtitle}
              </p>
            </div>
          </div>
          <button
            id="close-tech-modal-btn"
            onClick={onClose}
            className={`p-1 rounded border transition ${
              isLight
                ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-800 border-slate-200'
                : 'hover:bg-[#21262d] text-slate-400 hover:text-white border-[#30363D]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-xs">
          {/* Key Answer Card */}
          <div className={`rounded border p-3.5 ${
            isLight 
              ? 'bg-slate-50 border-slate-200' 
              : 'bg-[#161B22] border-[#30363D]'
          }`}>
            <div className={`flex items-center gap-2 font-bold mb-1.5 font-mono ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{t.techQuestionTitle}</span>
            </div>
            <p className={`leading-relaxed font-sans text-xs ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              {t.techAnswerText}
            </p>
          </div>

          {/* Dependencies breakdown */}
          <div>
            <div className={`text-[10px] uppercase tracking-widest font-mono font-semibold mb-2 flex items-center gap-1.5 ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}>
              <Code className="w-3.5 h-3.5 text-blue-500" />
              {t.packagesTitle}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
              <div className={`p-2 rounded border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#161B22] border-[#30363D]'
              }`}>
                <span className="text-blue-500 font-bold block">leaflet</span>
                <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Core Engine v1.9.4</span>
              </div>
              <div className={`p-2 rounded border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#161B22] border-[#30363D]'
              }`}>
                <span className="text-blue-500 font-bold block">@types/leaflet</span>
                <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>TypeScript Defs</span>
              </div>
              <div className={`p-2 rounded border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#161B22] border-[#30363D]'
              }`}>
                <span className="text-emerald-500 font-bold block">leaflet.css</span>
                <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Mandatory Styles</span>
              </div>
            </div>
          </div>

          {/* Tile Layer Endpoints */}
          <div>
            <div className={`text-[10px] uppercase tracking-widest font-mono font-semibold mb-2 flex items-center gap-1.5 ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}>
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              {t.tileUrlsTitle}
            </div>
            <div className="space-y-2">
              {TILE_LAYERS.map((layer) => (
                <div key={layer.id} className={`p-2.5 rounded border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#161B22] border-[#30363D]'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {layer.name}
                    </span>
                    <button
                      onClick={() => handleCopy(layer.url)}
                      className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border transition ${
                        isLight 
                          ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' 
                          : 'bg-[#0A0C10] hover:bg-[#21262d] text-slate-300 border-[#2D333B]'
                      }`}
                    >
                      {copiedUrl === layer.url ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">{t.copiedUrl}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>{t.copyUrl}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className={`font-mono text-[10px] p-1.5 rounded border select-all break-all ${
                    isLight 
                      ? 'bg-white text-emerald-700 border-slate-200' 
                      : 'bg-[#0A0C10] text-emerald-400 border-[#2D333B]'
                  }`}>
                    {layer.url}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-4 pt-3 border-t flex justify-end ${
          isLight ? 'border-slate-200' : 'border-[#2D333B]'
        }`}>
          <button
            onClick={onClose}
            className={`px-3.5 py-1.5 rounded border text-xs font-mono transition ${
              isLight 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' 
                : 'bg-[#161B22] hover:bg-[#21262d] text-white border-[#30363D]'
            }`}
          >
            {t.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
