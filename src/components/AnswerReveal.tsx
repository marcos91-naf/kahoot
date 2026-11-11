import React, { useEffect } from 'react';
import { Question, Player } from '../types/game';
import { ShapeIcon } from './ShapeIcon';
import { Check, X, Flame, ChevronRight, Award, Lightbulb, Users } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface AnswerRevealProps {
  question: Question;
  userOptionId: string | null;
  isCorrect: boolean;
  scoreAwarded: number;
  timeTaken: number;
  streak: number;
  bots: Player[];
  onNext: () => void;
}

export const AnswerReveal: React.FC<AnswerRevealProps> = ({
  question,
  userOptionId,
  isCorrect,
  scoreAwarded,
  timeTaken,
  streak,
  bots,
  onNext,
}) => {
  useEffect(() => {
    if (isCorrect) {
      soundFx.playCorrect();
      if (streak >= 3) {
        setTimeout(() => soundFx.playStreak(), 400);
      }
    } else {
      soundFx.playWrong();
    }
  }, [isCorrect, streak]);

  // Calculate simulated vote distribution for the 4 options
  // Correct option gets ~70% of bot votes, others split the rest
  const distribution: { [key: string]: number } = {};
  question.options.forEach((opt) => {
    distribution[opt.id] = 0;
  });

  if (userOptionId && distribution[userOptionId] !== undefined) {
    distribution[userOptionId] += 1;
  }

  // Simulate bots votes
  bots.forEach((bot) => {
    const lastAns = bot.answers.find((a) => a.questionId === question.id);
    if (lastAns && distribution[lastAns.optionId] !== undefined) {
      distribution[lastAns.optionId] += 1;
    } else {
      // Fallback
      const pick = question.options.find((o) => o.isCorrect) || question.options[0];
      distribution[pick.id] += 1;
    }
  });

  const totalVotes = Object.values(distribution).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* Result Status Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl mb-6 transform transition-all animate-in zoom-in-95 duration-200 ${
          isCorrect
            ? 'bg-gradient-to-r from-emerald-600 to-green-500'
            : userOptionId === null
            ? 'bg-gradient-to-r from-amber-600 to-yellow-600'
            : 'bg-gradient-to-r from-rose-600 to-red-600'
        }`}
      >
        <div className="text-4xl sm:text-5xl mb-2">
          {isCorrect ? '🎉' : userOptionId === null ? '⏰' : '❌'}
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
          {isCorrect
            ? '¡Respuesta Correcta!'
            : userOptionId === null
            ? '¡Se acabó el tiempo!'
            : '¡Respuesta Incorrecta!'}
        </h2>

        {/* Score & Streak Banner */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4">
          <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-300" />
            <span>+{scoreAwarded.toLocaleString()} puntos</span>
          </div>

          {isCorrect && (
            <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold">
              ⏱️ Tiempo: {timeTaken.toFixed(1)}s
            </div>
          )}

          {streak >= 2 && (
            <div className="bg-amber-400 text-slate-950 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md">
              <Flame className="w-4 h-4 fill-current text-rose-600" />
              <span>¡Racha activa de {streak}! 🔥</span>
            </div>
          )}
        </div>
      </div>

      {/* Answer Distribution & Options Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 mb-6">
        
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Respuestas del Equipo de Capacitación:</span>
          </span>
          <span>{totalVotes} votos totales</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {question.options.map((option) => {
            const votes = distribution[option.id] || 0;
            const votePercent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
            const isUserPick = userOptionId === option.id;

            return (
              <div
                key={option.id}
                className={`relative p-4 rounded-2xl border-2 transition-all overflow-hidden flex flex-col justify-between ${
                  option.isCorrect
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-md ring-2 ring-emerald-400/40'
                    : isUserPick
                    ? 'border-rose-400 bg-rose-50/70'
                    : 'border-slate-200 bg-slate-50/60 opacity-75'
                }`}
              >
                {/* Background vote bar */}
                <div
                  className={`absolute left-0 bottom-0 top-0 opacity-15 pointer-events-none transition-all duration-700 ${
                    option.isCorrect ? 'bg-emerald-600' : 'bg-slate-400'
                  }`}
                  style={{ width: `${votePercent}%` }}
                />

                <div className="flex items-start gap-3 relative z-10">
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white ${
                      option.color === 'red'
                        ? 'bg-[#e21b3c]'
                        : option.color === 'blue'
                        ? 'bg-[#1368ce]'
                        : option.color === 'yellow'
                        ? 'bg-[#d88900]'
                        : 'bg-[#26890c]'
                    }`}
                  >
                    <ShapeIcon shape={option.shape} className="w-4 h-4" />
                  </div>

                  <div className="flex-1">
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                      {option.text}
                    </div>
                    {isUserPick && (
                      <span className="inline-block mt-1 text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                        Tu elección
                      </span>
                    )}
                  </div>

                  {/* Checkmark or Cross indicator */}
                  <div className="shrink-0">
                    {option.isCorrect ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : isUserPick ? (
                      <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                        <X className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Vote percentage tag */}
                <div className="mt-2 text-right text-[11px] font-bold text-slate-500 relative z-10">
                  {votes} {votes === 1 ? 'voto' : 'votos'} ({votePercent}%)
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Didactic Explanation */}
        <div className="mt-6 pt-6 border-t border-slate-100 bg-purple-50/60 rounded-2xl p-5 border border-purple-100">
          <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
            <Lightbulb className="w-4 h-4 text-[#ffa602]" />
            <span>Fundamento de la Capacitación Comercial ({question.slideSource})</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 font-semibold leading-relaxed">
            {question.explanation}
          </p>
        </div>

      </div>

      {/* Continue CTA */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            soundFx.playSelectOption();
            onNext();
          }}
          className="bg-[#46178f] hover:bg-[#34116c] active:scale-95 text-white font-black text-base sm:text-lg px-8 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 transition-all"
        >
          <span>Siguiente</span>
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
};
