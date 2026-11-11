import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Player, Question, LocalScoreRecord } from '../types/game';
import { Trophy, Award, Flame, RefreshCw, BookOpen, HardDrive, Printer, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface PodiumScreenProps {
  players: Player[];
  userId: string;
  questions: Question[];
  onPlayAgain: () => void;
  onOpenStudy: () => void;
}

export const PodiumScreen: React.FC<PodiumScreenProps> = ({
  players,
  userId,
  questions,
  onPlayAgain,
  onOpenStudy,
}) => {
  const [showCertificate, setShowCertificate] = useState(false);

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];
  const user = players.find((p) => p.id === userId) || sorted[0];
  const userRank = sorted.findIndex((p) => p.id === user.id) + 1;

  useEffect(() => {
    soundFx.playPodium();

    // Fire local confetti cannons
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffa602', '#e21b3c', '#1368ce', '#26890c']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffa602', '#e21b3c', '#1368ce', '#26890c']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Save record to local storage
    if (user) {
      try {
        const totalAns = user.answers.length || 1;
        const correctAns = user.answers.filter((a) => a.isCorrect).length;
        const accuracy = Math.round((correctAns / totalAns) * 100);

        const newRecord: LocalScoreRecord = {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString(),
          playerName: user.name,
          score: user.score,
          accuracy,
          presetTitle: 'Capacitación Diapos 3 a 10',
          maxStreak: user.streak,
        };

        const existingStr = localStorage.getItem('kahoot_wa_scores');
        const existing: LocalScoreRecord[] = existingStr ? JSON.parse(existingStr) : [];
        const updated = [newRecord, ...existing].slice(0, 10);
        localStorage.setItem('kahoot_wa_scores', JSON.stringify(updated));
      } catch {
        // Ignore local storage error in sandboxed contexts
      }
    }
  }, [user]);

  const totalAnswered = user?.answers.length || 0;
  const correctCount = user?.answers.filter((a) => a.isCorrect).length || 0;
  const accuracyPercent = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Compute category stats
  const categoryStats: { [cat: string]: { label: string; total: number; correct: number } } = {};
  questions.forEach((q) => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { label: q.categoryLabel, total: 0, correct: 0 };
    }
    categoryStats[q.category].total += 1;
    const userAns = user?.answers.find((a) => a.questionId === q.id);
    if (userAns?.isCorrect) {
      categoryStats[q.category].correct += 1;
    }
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Grand Kahoot Victory Title */}
      <div className="text-center text-white mb-8">
        <div className="inline-flex items-center gap-2 bg-[#ffa602] text-slate-950 font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-lg">
          <Sparkles className="w-4 h-4 fill-current" />
          <span>¡GRAN PODIO FINAL LOCAL!</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
          Capacitación: Ventas por WhatsApp
        </h1>
        <p className="text-sm sm:text-base text-purple-200">
          Resultados de la evaluación comercial · Diapositivas evaluadas: 3 a 10
        </p>
      </div>

      {/* 3-Tier Podium Stage */}
      <div className="bg-slate-900/95 rounded-3xl p-6 sm:p-10 shadow-2xl border border-purple-500/30 mb-8 backdrop-blur-md">
        
        <div className="flex items-end justify-center gap-2 sm:gap-6 pt-12 pb-4">
          
          {/* 2nd Place (Silver) */}
          {second && (
            <div className="flex flex-col items-center flex-1 max-w-[160px] animate-in slide-in-from-bottom duration-500">
              <div className="text-3xl sm:text-4xl mb-1">{second.avatar}</div>
              <div className="font-extrabold text-xs sm:text-sm text-white truncate max-w-full text-center">
                {second.name}
              </div>
              <div className="font-mono text-xs font-bold text-amber-300 mb-2">
                {second.score.toLocaleString()} pts
              </div>

              {/* Silver Pillar */}
              <div className="w-full bg-gradient-to-t from-slate-600 to-slate-400 h-28 sm:h-36 rounded-t-2xl flex flex-col items-center justify-start pt-3 shadow-lg border-t-2 border-slate-200">
                <span className="font-black text-2xl sm:text-3xl text-slate-900">2</span>
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Plata</span>
              </div>
            </div>
          )}

          {/* 1st Place (Gold) - Champion */}
          {first && (
            <div className="flex flex-col items-center flex-1 max-w-[190px] animate-in slide-in-from-bottom duration-700">
              <div className="relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl">👑</span>
                <div className="text-4xl sm:text-5xl mb-1 animate-bounce">{first.avatar}</div>
              </div>
              <div className="font-extrabold text-sm sm:text-base text-white truncate max-w-full text-center">
                {first.name}
              </div>
              <div className="font-mono text-xs sm:text-sm font-black text-[#ffa602] mb-2">
                {first.score.toLocaleString()} pts
              </div>

              {/* Gold Pillar (Tallest) */}
              <div className="w-full bg-gradient-to-t from-amber-600 to-[#ffa602] h-40 sm:h-52 rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-2xl border-t-4 border-amber-300">
                <Trophy className="w-6 h-6 text-slate-950 mb-1" />
                <span className="font-black text-3xl sm:text-4xl text-slate-950">1</span>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Campeón</span>
              </div>
            </div>
          )}

          {/* 3rd Place (Bronze) */}
          {third && (
            <div className="flex flex-col items-center flex-1 max-w-[160px] animate-in slide-in-from-bottom duration-500">
              <div className="text-3xl sm:text-4xl mb-1">{third.avatar}</div>
              <div className="font-extrabold text-xs sm:text-sm text-white truncate max-w-full text-center">
                {third.name}
              </div>
              <div className="font-mono text-xs font-bold text-amber-300 mb-2">
                {third.score.toLocaleString()} pts
              </div>

              {/* Bronze Pillar */}
              <div className="w-full bg-gradient-to-t from-amber-950 to-amber-700 h-20 sm:h-24 rounded-t-2xl flex flex-col items-center justify-start pt-2 shadow-lg border-t-2 border-amber-500">
                <span className="font-black text-xl sm:text-2xl text-amber-200">3</span>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Bronce</span>
              </div>
            </div>
          )}

        </div>

        {/* User Rank Announcement */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-base sm:text-lg text-white font-bold">
            {userRank === 1
              ? '🥇 ¡Excelente trabajo! Eres el Asesor Comercial Campeón de la ronda.'
              : userRank <= 3
              ? `🏆 ¡Muy buen desempeño! Conquistaste el puesto #${userRank} en el podio.`
              : `👏 ¡Gran participación! Finalizaste en el puesto #${userRank} de ${players.length} participantes.`}
          </p>
        </div>

      </div>

      {/* Performance Report Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 mb-8">
        
        <h2 className="text-sm font-bold uppercase tracking-wider text-purple-900 mb-6 flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-600" />
          <span>Reporte de Rendimiento Comercial (Diapositivas 3 a 10)</span>
        </h2>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-center">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
              Puntaje Acumulado
            </span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-purple-950">
              {user?.score.toLocaleString()} pts
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-center">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Precisión de Aciertos
            </span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-emerald-950">
              {accuracyPercent}%
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">
              {correctCount} de {totalAnswered} preguntas
            </span>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-center">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
              Mejor Racha de Fuego
            </span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-amber-950 flex items-center justify-center gap-1">
              <Flame className="w-6 h-6 text-amber-500 fill-current" />
              <span>x{user?.streak || 0}</span>
            </div>
          </div>
        </div>

        {/* Breakdown by Training Theme */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Dominio por Módulo de Capacitación:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(categoryStats).map(([key, stat]) => {
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div key={key} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-800">{stat.label}</span>
                    <span className={pct >= 70 ? 'text-emerald-600' : 'text-amber-600'}>
                      {stat.correct}/{stat.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Missed Questions (if any) */}
        {user && user.answers.some((a) => !a.isCorrect) && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Preguntas para Repasar:
            </h3>
            <div className="space-y-3">
              {user.answers
                .filter((a) => !a.isCorrect)
                .map((ans) => {
                  const q = questions.find((item) => item.id === ans.questionId);
                  if (!q) return null;
                  const correctOpt = q.options.find((o) => o.isCorrect);

                  return (
                    <div key={ans.questionId} className="bg-rose-50/60 border border-rose-100 rounded-xl p-3.5 text-xs">
                      <div className="font-bold text-slate-900 mb-1">{q.question}</div>
                      <div className="text-slate-600 mb-1">
                        <span className="font-semibold text-emerald-700">Respuesta correcta: </span>
                        {correctOpt?.text}
                      </div>
                      <div className="text-slate-500 italic">
                        📖 Referencia: {q.slideSource}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

      </div>

      {/* Diplomatic Certificate Modal / View */}
      {showCertificate && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-amber-400 mb-8 relative text-center print:border-none print:shadow-none animate-in fade-in zoom-in-95 duration-200">
          <div className="border-2 border-dashed border-amber-300 p-6 sm:p-10 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 text-3xl">
              🏆
            </div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-amber-700 mb-1">
              Acreditación Comercial Local
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
              Capacitación: Ventas por WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Módulos Evaluados: Diapositivas 3 a 10 (Evolución, Políticas Meta, SLA, Leadsales, Funnel y BANT)
            </p>

            <div className="text-sm sm:text-base text-slate-700 mb-6">
              Se otorga la presente constancia de acreditación comercial a:
              <div className="text-2xl sm:text-3xl font-black text-purple-900 my-2">
                {user?.name || 'Asesor Comercial'}
              </div>
              por haber completado satisfactoriamente el juego evaluativo local con{' '}
              <span className="font-bold text-emerald-700">{accuracyPercent}% de precisión</span> y{' '}
              <span className="font-bold text-purple-700">{user?.score.toLocaleString()} puntos</span>.
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-4 border-t border-slate-200 text-xs text-slate-500">
              <div>
                <div className="font-bold text-slate-800">Evaluación Interna</div>
                <div>Equipo Comercial</div>
              </div>
              <div>
                <div className="font-bold text-slate-800">WhatsApp & Leadsales</div>
                <div>Ecosistema Digital</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-3 print:hidden">
            <button
              onClick={() => window.print()}
              className="bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Certificado</span>
            </button>
            <button
              onClick={() => setShowCertificate(false)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={onPlayAgain}
          className="bg-[#26890c] hover:bg-[#20750a] active:scale-95 text-white font-black text-base px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Jugar Otra Ronda</span>
        </button>

        <button
          onClick={onOpenStudy}
          className="bg-[#46178f] hover:bg-[#34116c] active:scale-95 text-white font-black text-base px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>Fichas de Estudio</span>
        </button>

        <button
          onClick={() => setShowCertificate(true)}
          className="bg-[#ffa602] hover:bg-[#e69500] active:scale-95 text-slate-950 font-black text-base px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 transition-all"
        >
          <Award className="w-4 h-4" />
          <span>Ver Diploma</span>
        </button>
      </div>

    </div>
  );
};
