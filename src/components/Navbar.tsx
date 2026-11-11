import React, { useState } from 'react';
import { Volume2, VolumeX, BookOpen, RefreshCw, HardDrive, Monitor, Users } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { GameStage, GameMode } from '../types/game';

interface NavbarProps {
  currentStage: GameStage;
  currentMode: GameMode;
  onNavigateHome: () => void;
  onOpenStudy: () => void;
  onRestartGame: () => void;
  onTogglePresenterMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  currentMode,
  onNavigateHome,
  onOpenStudy,
  onRestartGame,
}) => {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [volume, setVolume] = useState(soundFx.getVolume());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundFx.setMuted(nextState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundFx.setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      soundFx.setMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
      soundFx.setMuted(false);
    }
  };

  const isPlaying = currentStage !== 'home' && currentStage !== 'lobby' && currentStage !== 'final_podium';

  return (
    <header className="sticky top-0 z-50 bg-[#46178f] text-white shadow-md border-b border-purple-900/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
        >
          <div className="bg-[#ffa602] text-slate-900 font-black text-xl px-2.5 py-0.5 rounded tracking-tighter shadow-sm transform group-hover:scale-105 transition-transform">
            K!
          </div>
          <div>
            <div className="font-extrabold text-base md:text-lg tracking-tight leading-none text-white flex items-center gap-2">
              <span>Kahoot! Ventas por WhatsApp</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                <HardDrive className="w-3 h-3" />
                <span>Modo Local Offline</span>
              </span>
            </div>
            <div className="text-[11px] text-purple-200 font-medium">
              Capacitación Comercial · Diapositivas 3 a 10
            </div>
          </div>
        </button>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Study Flashcards shortcut */}
          <button
            onClick={onOpenStudy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              currentMode === 'study'
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title="Ver resumen didáctico de las diapositivas 3 a 10"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Repasar Diapositivas (3 a 10)</span>
            <span className="sm:hidden">Repaso</span>
          </button>

          {/* If currently in mid-game, show restart button */}
          {isPlaying && (
            <button
              onClick={onRestartGame}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-medium bg-white/10 hover:bg-rose-500/80 text-white transition-colors"
              title="Reiniciar cuestionario local"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reiniciar</span>
            </button>
          )}

          {/* Sound Controls */}
          <div className="relative flex items-center">
            <button
              onClick={toggleMute}
              onMouseEnter={() => setShowVolumeSlider(true)}
              className={`p-2 rounded-lg transition-colors ${
                isMuted ? 'bg-rose-500/80 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
              aria-label="Control de sonido"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Volume mini-popup on hover or desktop */}
            {showVolumeSlider && (
              <div
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="absolute right-0 top-12 bg-slate-900/95 backdrop-blur border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-2 min-w-36 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <span className="text-[11px] text-slate-300 font-medium">Vol</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#ffa602]"
                />
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
