import React from 'react';
import { Player } from '../types/game';
import { Trophy, Flame, ChevronRight, ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface LeaderboardScreenProps {
  players: Player[];
  userId: string;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  players,
  userId,
  questionNumber,
  totalQuestions,
  onNext,
}) => {
  // Sort players descending by score
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const maxScore = sorted[0]?.score || 1;
  const userRank = sorted.findIndex((p) => p.id === userId) + 1;
  const userPlayer = sorted.find((p) => p.id === userId);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center text-white mb-6">
        <div className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-amber-300 mb-2 border border-white/10">
          <Trophy className="w-3.5 h-3.5" />
          <span>Marcador en Vivo · Ronda {questionNumber} / {totalQuestions}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
          Tabla de Posiciones
        </h2>
      </div>

      {/* Leaderboard Card List */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-500/30 space-y-3 backdrop-blur-md">
        {sorted.slice(0, 5).map((player, idx) => {
          const isUser = player.id === userId;
          const scorePercent = Math.max(15, (player.score / maxScore) * 100);

          return (
            <div
              key={player.id}
              className={`relative rounded-2xl p-4 flex items-center gap-4 transition-all overflow-hidden border ${
                isUser
                  ? 'bg-purple-900/70 border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              {/* Background Score Fill Bar */}
              <div
                className={`absolute left-0 bottom-0 top-0 opacity-15 pointer-events-none ${
                  isUser ? 'bg-amber-400' : 'bg-purple-500'
                }`}
                style={{ width: `${scorePercent}%` }}
              />

              {/* Rank Badge */}
              <div
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                  idx === 0
                    ? 'bg-[#ffa602] text-slate-950 shadow-md ring-2 ring-amber-300'
                    : idx === 1
                    ? 'bg-slate-300 text-slate-950'
                    : idx === 2
                    ? 'bg-amber-700 text-white'
                    : 'bg-white/10 text-slate-300'
                }`}
              >
                {idx + 1}
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0 relative z-10">
                <span className="text-2xl">{player.avatar}</span>
                <div className="truncate">
                  <div className="font-extrabold text-sm sm:text-base text-white truncate flex items-center gap-2">
                    <span>{player.name}</span>
                    {isUser && (
                      <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black tracking-wider uppercase">
                        TÚ
                      </span>
                    )}
                  </div>
                  {player.streak >= 2 && (
                    <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-current text-amber-400" />
                      <span>Racha de {player.streak} seguidas</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Score and gain */}
              <div className="text-right shrink-0 relative z-10">
                <div className="font-mono text-base sm:text-lg font-black text-amber-300">
                  {player.score.toLocaleString()} pts
                </div>
                {player.lastScoreGain && player.lastScoreGain > 0 ? (
                  <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-end gap-0.5">
                    <ArrowUp className="w-3 h-3" />
                    <span>+{player.lastScoreGain}</span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}

        {/* If user is below top 5, show special user card */}
        {userRank > 5 && userPlayer && (
          <div className="pt-2 border-t border-white/10">
            <div className="text-xs text-center text-purple-200 mb-2 font-medium">
              ¡Sigue así! Estás compitiendo de cerca:
            </div>
            <div className="bg-purple-900/80 border border-amber-400 rounded-2xl p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 font-black text-sm flex items-center justify-center">
                  #{userRank}
                </div>
                <span className="text-2xl">{userPlayer.avatar}</span>
                <span className="font-bold">{userPlayer.name} (Tú)</span>
              </div>
              <div className="font-mono font-black text-amber-300">
                {userPlayer.score.toLocaleString()} pts
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Continue CTA */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => {
            soundFx.playSelectOption();
            onNext();
          }}
          className="bg-[#26890c] hover:bg-[#20750a] active:scale-95 text-white font-black text-base sm:text-lg px-8 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <span>{questionNumber >= totalQuestions ? 'Ver Gran Podio Final' : 'Siguiente Pregunta'}</span>
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
};
