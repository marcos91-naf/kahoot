import React, { useState, useEffect } from 'react';
import { Users, Sparkles, Clock, Trophy, Play, Check, Copy, Flame, HardDrive, Monitor, UserPlus, Trash2 } from 'lucide-react';
import { GAME_PRESETS, VIRTUAL_BOTS } from '../data/questions';
import { Player, GameMode, LocalScoreRecord } from '../types/game';
import { soundFx } from '../utils/audio';

const AVATARS = ['💼', '🚀', '🎯', '🔥', '🏆', '💎', '📈', '💬', '👑', '⚡', '🤖', '🥇'];

interface LobbyProps {
  onStartGame: (config: {
    presetId: string;
    players: { name: string; avatar: string }[];
    includeBots: boolean;
    timeLimitSeconds: number;
    gameMode: GameMode;
  }) => void;
  onOpenStudy: () => void;
}

export const Lobby: React.FC<LobbyProps> = ({ onStartGame, onOpenStudy }) => {
  const [selectedPresetId, setSelectedPresetId] = useState('full_tournament');
  const [gameMode, setGameMode] = useState<GameMode>('solo');
  
  // Players configuration (supports 1 to 4 local players)
  const [localPlayers, setLocalPlayers] = useState<{ name: string; avatar: string }[]>([
    { name: 'Asesor Comercial', avatar: '🚀' }
  ]);
  
  const [includeBots, setIncludeBots] = useState(true);
  const [timeLimit, setTimeLimit] = useState(15);
  const [localPin] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  const [copiedPin, setCopiedPin] = useState(false);
  const [localRecords, setLocalRecords] = useState<LocalScoreRecord[]>([]);

  useEffect(() => {
    soundFx.startLobbyMusic();
    
    // Load local high scores from localStorage
    try {
      const saved = localStorage.getItem('kahoot_wa_scores');
      if (saved) {
        setLocalRecords(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }

    return () => {
      soundFx.stopLobbyMusic();
    };
  }, []);

  const handleCopyPin = () => {
    navigator.clipboard?.writeText(localPin);
    setCopiedPin(true);
    soundFx.playSelectOption();
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const addLocalPlayer = () => {
    if (localPlayers.length >= 4) return;
    soundFx.playSelectOption();
    const nextAvatars = ['🎯', '💼', '🔥', '👑'];
    const nextIdx = localPlayers.length;
    setLocalPlayers((prev) => [
      ...prev,
      { name: `Vendedor ${nextIdx + 1}`, avatar: nextAvatars[nextIdx % nextAvatars.length] }
    ]);
  };

  const removeLocalPlayer = (idx: number) => {
    if (localPlayers.length <= 1) return;
    soundFx.playSelectOption();
    setLocalPlayers((prev) => prev.filter((_, i) => i !== idx));
  };

  const updatePlayerName = (idx: number, name: string) => {
    setLocalPlayers((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, name } : p))
    );
  };

  const updatePlayerAvatar = (idx: number, avatar: string) => {
    soundFx.playSelectOption();
    setLocalPlayers((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, avatar } : p))
    );
  };

  const handleStart = () => {
    soundFx.stopLobbyMusic();
    soundFx.playCorrect();
    onStartGame({
      presetId: selectedPresetId,
      players: localPlayers.map((p) => ({
        name: p.name.trim() || 'Asesor',
        avatar: p.avatar
      })),
      includeBots: gameMode === 'solo' ? includeBots : false,
      timeLimitSeconds: timeLimit,
      gameMode
    });
  };

  const clearLocalRecords = () => {
    try {
      localStorage.removeItem('kahoot_wa_scores');
      setLocalRecords([]);
      soundFx.playSelectOption();
    } catch {
      // Ignore
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-emerald-400/30">
          <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ejecución 100% Local · Capacitación Diapositivas 3 a 10</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
          Kahoot! Ventas por WhatsApp
        </h1>
        <p className="text-base sm:text-lg text-purple-200 max-w-2xl mx-auto font-medium">
          Juego interactivo local: Domina la evolución del canal, políticas de Meta, SLA menor a 5 min, CRM Leadsales, funnel conversacional y BANT.
        </p>
      </div>

      {/* Mode Tabs: Solo vs Local Multiplayer vs Sala Presentador */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 flex flex-wrap gap-1 max-w-lg w-full justify-center">
          <button
            onClick={() => {
              soundFx.playSelectOption();
              setGameMode('solo');
            }}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              gameMode === 'solo'
                ? 'bg-[#ffa602] text-slate-950 shadow-md'
                : 'text-purple-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Individual + Bots</span>
          </button>

          <button
            onClick={() => {
              soundFx.playSelectOption();
              setGameMode('local_team');
            }}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              gameMode === 'local_team'
                ? 'bg-[#ffa602] text-slate-950 shadow-md'
                : 'text-purple-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Pase Local (1 a 4)</span>
          </button>

          <button
            onClick={() => {
              soundFx.playSelectOption();
              setGameMode('presenter');
            }}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              gameMode === 'presenter'
                ? 'bg-[#ffa602] text-slate-950 shadow-md'
                : 'text-purple-200 hover:text-white hover:bg-white/5'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Modo Proyector</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Player Config & Preset Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Player Configuration Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>
                  {gameMode === 'local_team'
                    ? '1. Jugadores en esta Computadora (1 a 4)'
                    : '1. Tu Perfil Comercial'}
                </span>
              </h2>

              {gameMode === 'local_team' && localPlayers.length < 4 && (
                <button
                  onClick={addLocalPlayer}
                  className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Agregar Jugador</span>
                </button>
              )}
            </div>

            {/* Players List */}
            <div className="space-y-3">
              {localPlayers.map((player, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3"
                >
                  {/* Avatar Picker Button */}
                  <div className="relative group shrink-0">
                    <button
                      type="button"
                      className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-2xl shadow-sm hover:scale-105 transition-transform"
                    >
                      {player.avatar}
                    </button>
                  </div>

                  {/* Name Input */}
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={player.name}
                      maxLength={22}
                      onChange={(e) => updatePlayerName(pIdx, e.target.value)}
                      placeholder={`Nombre del jugador ${pIdx + 1}`}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm bg-white"
                    />
                  </div>

                  {/* Quick Avatar selection row */}
                  <div className="flex items-center gap-1 overflow-x-auto max-w-[160px] pb-1 sm:pb-0">
                    {AVATARS.slice(0, 5).map((av) => (
                      <button
                        key={av}
                        onClick={() => updatePlayerAvatar(pIdx, av)}
                        className={`w-7 h-7 rounded-lg text-xs flex items-center justify-center transition-all ${
                          player.avatar === av
                            ? 'bg-purple-600 text-white scale-110 shadow-sm'
                            : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>

                  {/* Remove player button if > 1 */}
                  {localPlayers.length > 1 && (
                    <button
                      onClick={() => removeLocalPlayer(pIdx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Eliminar jugador"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {gameMode === 'presenter' && (
              <p className="text-xs text-slate-500 mt-3 italic bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                💡 <strong>Modo Proyector para Capacitador:</strong> Ideal para conectar la laptop a la TV de la sala de juntas. Permite mostrar la pregunta, pausar el tiempo y revelar las respuestas didácticas con debate grupal.
              </p>
            )}
          </div>

          {/* Preset Selector */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-600" />
              <span>2. Selecciona la Modalidad (Diapositivas 3 a 10)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GAME_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      soundFx.playSelectOption();
                      setSelectedPresetId(preset.id);
                    }}
                    className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/70 shadow-md ring-1 ring-purple-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-200 text-purple-900">
                          {preset.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {preset.questionCount} preguntas
                        </span>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-sm leading-tight mb-1">
                        {preset.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-snug">
                        {preset.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>⏱️ {preset.duration}</span>
                      {isSelected && (
                        <span className="text-purple-700 font-bold flex items-center gap-0.5">
                          <Check className="w-3.5 h-3.5" /> Activo
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Extra Options: Time limit & Bots */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Bot Teammates Toggle */}
              {gameMode === 'solo' && (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeBots}
                    onChange={(e) => setIncludeBots(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    Contrincantes virtuales (Ximena, Paola, Daniel...)
                  </span>
                </label>
              )}

              {/* Time Selector */}
              <div className="flex items-center gap-2 ml-auto">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-600">Tiempo:</span>
                <select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none"
                >
                  <option value={10}>10 seg (Rápido)</option>
                  <option value={15}>15 seg (Estándar)</option>
                  <option value={20}>20 seg (Relajado)</option>
                  <option value={30}>30 seg (Sala de debate)</option>
                </select>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Game PIN & Kahoot Room Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Kahoot PIN & Local Box */}
          <div className="bg-slate-900/95 text-white rounded-3xl p-6 shadow-2xl border border-purple-500/30 text-center relative overflow-hidden backdrop-blur-md">
            
            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400 mb-2">
              <HardDrive className="w-3.5 h-3.5" />
              <span>SALA LOCAL EN ESTE DISPOSITIVO</span>
            </div>

            {/* PIN Code Display */}
            <div className="bg-white/10 rounded-2xl p-4 my-3 border border-white/15">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-1">
                PIN de la Sesión Local
              </div>
              <div className="font-mono text-4xl sm:text-5xl font-black text-[#ffa602] tracking-widest select-all">
                {localPin.slice(0, 3)} {localPin.slice(3)}
              </div>
            </div>

            <button
              onClick={handleCopyPin}
              className="text-xs font-semibold text-purple-200 hover:text-white inline-flex items-center gap-1.5 transition-colors py-1 px-3 rounded-lg bg-white/5 hover:bg-white/10"
            >
              {copiedPin ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPin ? '¡Copiado!' : 'Copiar PIN'}</span>
            </button>

            {/* Connected Local Players Preview */}
            <div className="mt-6 pt-4 border-t border-white/10 text-left">
              <div className="flex items-center justify-between text-xs text-purple-200 font-bold mb-3">
                <span>Participantes listos:</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">
                  {gameMode === 'solo' && includeBots
                    ? VIRTUAL_BOTS.length + 1
                    : localPlayers.length}{' '}
                  Jugadores
                </span>
              </div>

              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
                {/* Active Local Players */}
                {localPlayers.map((lp, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-lg shadow-sm"
                  >
                    <span>{lp.avatar}</span>
                    <span>{lp.name}</span>
                  </div>
                ))}

                {/* Virtual Bots */}
                {gameMode === 'solo' &&
                  includeBots &&
                  VIRTUAL_BOTS.map((bot) => (
                    <div
                      key={bot.name}
                      className="inline-flex items-center gap-1.5 bg-white/10 text-slate-200 text-xs px-2.5 py-1 rounded-lg"
                    >
                      <span>{bot.avatar}</span>
                      <span>{bot.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Big Start Button */}
            <button
              onClick={handleStart}
              className="w-full mt-6 bg-[#26890c] hover:bg-[#20750a] active:scale-98 text-white font-black text-lg py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transform transition-all hover:scale-[1.02]"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>¡INICIAR KAHOOT LOCAL!</span>
            </button>
          </div>

          {/* Local High Scores / Historial de Partidas */}
          {localRecords.length > 0 && (
            <div className="bg-slate-900/80 rounded-3xl p-5 border border-white/10 text-white">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-3 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Récords Locales Anteriores</span>
                </span>
                <button
                  onClick={clearLocalRecords}
                  className="text-[10px] text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Limpiar
                </button>
              </div>

              <div className="space-y-2">
                {localRecords.slice(0, 3).map((rec, i) => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between text-xs bg-white/5 p-2 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-400">#{i + 1}</span>
                      <span className="font-semibold text-slate-200">{rec.playerName}</span>
                    </div>
                    <div className="font-mono font-bold text-amber-300">
                      {rec.score.toLocaleString()} pts ({rec.accuracy}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flashcards shortcut */}
          <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 text-white rounded-3xl p-5 border border-purple-400/20 flex items-center justify-between gap-4">
            <div>
              <div className="font-extrabold text-sm mb-0.5">Estudio de Diapositivas 3 a 10</div>
              <p className="text-xs text-purple-200">
                Revisa las fichas offline antes de iniciar la evaluación.
              </p>
            </div>
            <button
              onClick={onOpenStudy}
              className="shrink-0 bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
            >
              Fichas
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
